import { parseISO, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import NewSubscription from '../jobs/NewSubscription';
import User from '../models/User';
import Meetup from '../models/Meetup';
import File from '../models/File';

class SubscriptionController {
  async store(req, res) {
    const { id: meetupId } = req.params;
    const meetup = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });
    const subscriber = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    /**
     * Check if user has already subscribed to meetup
     */
    const subscriptionExists = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id: meetupId,
      },
    });

    if (subscriptionExists)
      return res
        .status(400)
        .json({ error: 'You have already subscribed to this meetup.' });

    /**
     * Check if meetup date is in the future
     */

    if (isBefore(parseISO(meetup.date), new Date())) {
      return res.status(403).json({
        error: 'You cannot subscribe to a meetup that already happened',
      });
    }
    /**
     * Check if user is the creator of the meetup
     */
    if (req.userId === meetup.user_id) {
      return res.status(403).json({
        error: 'You cannot subscribe to a meetup that YOU have created.',
      });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(400).json({
        error: 'You have already suscribed to a meetup at the same time.',
        checkDate,
        userId: req.userId,
      });
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetupId,
    });

    await Queue.add(NewSubscription.key, {
      meetup,
      subscriber,
    });

    return res.json(subscription);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const pageLimit = 10;

    const userSubscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      limit: pageLimit,
      order: [['meetup', 'date']],
      offset: (page - 1) * pageLimit,
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    /**
     * Checks for empty pages and returns 404
     */
    if (!userSubscriptions.length) {
      return res
        .status(404)
        .json({ error: `No subscriptions found on page: ${page}` });
    }

    return res.json(userSubscriptions);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id, {
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['name'],
        },
      ],
    });

    /**
     * Check if there is a meetup with this ID
     */

    if (!subscription)
      return res.status(404).json({ error: 'No meetup found with this id' });

    /**
     * Check if the user is the creator of the meetup
     */

    if (subscription.user_id !== req.userId) {
      return res.status(401).json({
        error:
          'You cannot make changes to this subscription. User unauthorized',
      });
    }

    await subscription.destroy();
    return res.json(subscription);
  }
}

export default new SubscriptionController();

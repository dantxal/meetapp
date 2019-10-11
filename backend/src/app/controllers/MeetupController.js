import { startOfDay, endOfDay, isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      location: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { name, description, date, location, banner_id } = req.body;

    const meetupExists = await Meetup.findOne({
      where: {
        name,
        date,
        location,
      },
    });

    if (meetupExists) {
      return res.status(400).json({ error: 'This meetup already exists.' });
    }

    /**
     * Check if date is in the past
     */
    const parsedDate = parseISO(date);
    if (isBefore(parsedDate, new Date())) {
      return res
        .status(401)
        .json({ error: 'You cannot set the date to the past' });
    }

    const meetup = await Meetup.create({
      user_id: req.userId,
      name,
      description,
      date,
      location,
      banner_id,
    });

    return res.json(meetup);
  }

  async index(req, res) {
    const { page = 1, date } = req.query;
    const parsedDate = parseISO(date);

    const selectDate = date
      ? {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        }
      : {
          [Op.gt]: new Date(),
        };

    const meetups = await Meetup.findAll({
      where: {
        user_id: {
          [Op.ne]: req.userId,
        },
        date: selectDate,
      },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
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
    });
    /**
     * Check if there is a meetup in the future or date(set by query filter)
     */
    if (meetups.length === 0)
      return res.status(404).json({
        error: date
          ? 'There is no meetup scheduled to this date.'
          : 'There is no meetup scheduled in the future yet',
      });

    return res.json(meetups);
  }

  async show(req, res) {
    const { id: meetupId } = req.params;

    const meetup = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      date: Yup.date(),
      location: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { name, description, date, location, banner_id } = req.body;
    const { id: meetupId } = req.params;

    const meetup = await Meetup.findByPk(meetupId);

    /**
     * Check if there is a meetup with this ID
     */

    if (!meetup)
      return res.status(400).json({ error: 'No meetup found with this id' });

    /**
     * Check if the user is the creator of the meetup
     */

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You cannot make changes to this meetup. User unauthorized',
      });
    }

    /**
     * Check if the meetup has already happended
     */

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'You cannot edit a meetup that already happened' });
    }

    /**
     * Check if date is in the past
     */
    if (date && isBefore(parseISO(date), new Date())) {
      return res
        .status(401)
        .json({ error: 'You cannot set the date to the past' });
    }

    /**
     * Check if there is another meetup with same NAME,DATE and LOCATION
     */
    const queryKeys = {
      date: date || meetup.date,
      location: location || meetup.location,
      name: name || meetup.name,
    };
    const meetupExists = await Meetup.findOne({
      where: {
        id: {
          [Op.ne]: meetupId,
        },
        ...queryKeys,
      },
    });

    if (meetupExists) {
      return res.status(400).json({
        error:
          'There is already a meetup with the same name, date and location.',
      });
    }

    const updatedMeetup = await meetup.update({
      name,
      description,
      date,
      location,
      banner_id,
    });

    return res.json(updatedMeetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check if there is a meetup with this ID
     */

    if (!meetup)
      return res.status(400).json({ error: 'No meetup found with this id' });

    /**
     * Check if the user is the creator of the meetup
     */

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You cannot make changes to this meetup. User unauthorized',
      });
    }

    /**
     * Check if the meetup has already happended
     */

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'You cannot edit a meetup that already happened' });
    }

    await meetup.destroy();
    return res.json(meetup);
  }
}

export default new MeetupController();

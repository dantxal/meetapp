import Meetup from '../models/Meetup';
import File from '../models/File';

class MyMeetupsController {
  async index(req, res) {
    const myMeetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (myMeetups.length === 0)
      return res
        .status(400)
        .json({ error: "You haven't created any meetup yet" });

    return res.json(myMeetups);
  }
}

export default new MyMeetupsController();

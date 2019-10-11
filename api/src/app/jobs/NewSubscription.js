import Mail from '../../lib/Mail';

class NewSubscription {
  get key() {
    return 'NewSubscription';
  }

  async handle({ data }) {
    const { meetup, subscriber } = data;

    console.log('Queue: NewSubscription running...');

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'New subscription',
      template: 'newSubscription',
      context: {
        user: meetup.user,
        subscriber,
        meetupName: meetup.name,
      },
    });
  }
}

export default new NewSubscription();

import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const SingleMeetup = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Lodenn:Malawe8888@cluster0.ixjqb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    "mongodb+srv://Lodenn:Malawe8888@cluster0.ixjqb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const singleMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(singleMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        title: singleMeetup.title,
        image: singleMeetup.image,
        address: singleMeetup.address,
      },
    },
  };
}

export default SingleMeetup;

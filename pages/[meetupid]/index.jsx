import MeetupDetails from "@/components/meetups/MeetupDetails";
import { DUMMY_MEETUPS } from "..";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupID(props) {
  // const router = useRouter();
  // const id = router.query.meetupid;
  // const existItem = DUMMY_MEETUPS.find((event) => event.id === id);

  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetupDetails
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://fadyezzat2483:FadyEzzat4923@cluster0.canm9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false, // told nextJS if that paths all or just some of them
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const ID = context.params.meetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://fadyezzat2483:FadyEzzat4923@cluster0.canm9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({ _id: new ObjectId(ID) });

  client.close();

  return {
    props: {
      meetup: {
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
      },
    },
  };
}

// {
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString(),
//         description: meetup.description,
//       },

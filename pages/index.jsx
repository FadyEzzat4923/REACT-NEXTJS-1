import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function Home(props) {
  // (props) here to recive props data come from getStaticProps

  return (
    <>
      <Head>
        <title>Fady React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   //running always in the server after deployment

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // to provide a pre-render data in server side

  const client = await MongoClient.connect(
    "mongodb+srv://fadyezzat2483:FadyEzzat4923@cluster0.canm9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const result = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: result.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10, // to refetch after ... 10 => 10 seconds
  };
}

// getStaticProps() faster then  getServerSideProps()
// in generate the pre - render  HTML file and in re - generate all time.

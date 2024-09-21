import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function NewMeetup() {
  const router = useRouter();
  async function addMeetupPage(formData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="Add your new meetup here!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupPage} />
    </>
  );
}

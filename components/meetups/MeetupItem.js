// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();

  function handleShowDetails() {
    router.push(`/${props.id}`)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* <Link href={`/${props.id}`}> */}
          <button onClick={handleShowDetails}>Show Details</button>
          {/* </Link> */}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

import Grid from "@material-ui/core/Grid";
import AppCard from "./AppCard";

interface Props {
  obj: any;
}

function AppCards({ obj }: Props) {
  return (
    <div>
      <Grid container spacing={3}>
        {obj.map((co: any, ind: number) => {
          return <AppCard co={co} ind={ind} />;
        })}
      </Grid>
    </div>
  );
}

export default AppCards;

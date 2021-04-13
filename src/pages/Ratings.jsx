import { Card, CardContent, Grid } from '@material-ui/core';
import MyRating from '../components/MyRating';
import RatingGroups from '../components/RatingGroups';
import RenderRatings from '../components/RenderRatings';

const Ratings = ({ author = false }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4} lg={4}>
      <Card style={{ position: 'sticky', top: 0 }}>
        <CardContent style={{ paddingBottom: 0 }}>
          <RatingGroups />
          {!author && <MyRating />}
        </CardContent>
      </Card>
    </Grid>
    <Grid item md={8} xs={12}>
      <RenderRatings />
    </Grid>
  </Grid>
);

export default Ratings;

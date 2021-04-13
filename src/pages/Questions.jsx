import { Card, CardContent, Grid } from '@material-ui/core';
import RenderQuestions from '../components/RenderQuestions';
import SearchBar from '../components/SearchBar';
import QuestionForm from '../components/QuestionForm';

const Questions = () => (
  <>
    <SearchBar placeholder='Search Questions...' />
    <Grid container spacing={2} style={{ marginTop: '8px' }}>
      <Grid item xs={12} md={5} lg={4}>
        <Card>
          <CardContent>
            <QuestionForm />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <RenderQuestions />
      </Grid>
    </Grid>
  </>
);

export default Questions;

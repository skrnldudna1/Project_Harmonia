import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const dummyPosts = [
  { id: 1, title: "와인 한 잔", image: "https://source.unsplash.com/random/300x200?wine" },
  { id: 2, title: "빈티지 감성", image: "https://source.unsplash.com/random/300x200?vintage" },
  { id: 3, title: "예술적인 분위기", image: "https://source.unsplash.com/random/300x200?art" },
  { id: 4, title: "고급 레스토랑", image: "https://source.unsplash.com/random/300x200?restaurant" },
  { id: 5, title: "모던한 공간", image: "https://source.unsplash.com/random/300x200?modern" },
];

const MainPage = () => {
  return (
     <Container maxWidth="lg" className="main-container">
      <Typography variant="h4" className="page-title">
        🩰 Harmonia
        </Typography>
      <Grid container spacing={3}>
        {dummyPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card className="post-card">
              <CardMedia component="img" height="200" image={post.image} alt={post.title} />
              <CardContent>
                <Typography variant="h6" className="post-title">
                  {post.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default MainPage;

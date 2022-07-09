import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions";
import {
    CircularProgress,
    makeStyles,
    Grid,
    Container,
} from "@material-ui/core";
import PostFeed from "../components/postdetail/PostFeed";

const useStyles = makeStyles((theme) => ({
    postsContainer: {
        width: "50vw",
        minWidth: "400px",
        backgroundColor: "#FAFAFA",
        paddingTop: "10px",
        paddingLeft: 0,
        paddingRight: 0,
    },
    post: {
        marginTop: 20,
        marginBottom: 20,
    },
}));

function Posts() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.post));
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (!posts) {
        return <CircularProgress />;
    }

    return (
        <Container className={classes.postsContainer} maxWidth="lg">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                {posts.reverse().map((post) => (
                    <Grid className={classes.post} item xs={12} key={post._id}>
                        <PostFeed post={post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Posts;

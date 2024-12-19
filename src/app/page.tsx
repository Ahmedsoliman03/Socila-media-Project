"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/Redux/store";
import { getPostts } from "@/Redux/slices/allPosts";
import Loading from "./loading";
import PostDetails from "./_Components/postdetails/PostDetails";
import { Container } from "@mui/material";

export default function Home() {
  const { posts, isloading } = useSelector(
    (state: storeState) => state.postReducer
  );
  const { push } = useRouter();
  const dispatch = useDispatch<storeDispatch>();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    } else {
      dispatch(getPostts());
    }
  }, [localStorage.getItem("token")]);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Container maxWidth="sm">
          {posts.map((post) => (
            <PostDetails key={post._id} post={post} />
          ))}
        </Container>
      )}
    </>
  );
}

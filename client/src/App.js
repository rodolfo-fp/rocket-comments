import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

import Comment from "./components/Comment";
import Form from "./components/Form";

const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
    }
  }
`;

const SAVE_COMMENT = gql`
  mutation SaveComment($name: String!, $content: String!) {
    saveComment(input: { name: $name, content: $content }) {
      id
      name
      content
    }
  }
`;

export default function App() {
  const [comments, setComments] = useState([]);

  const { loading, error, data } = useQuery(GET_COMMENTS);
  const [saveComment, saveData] = useMutation(SAVE_COMMENT);

  useEffect(() => {
    data && data.comments && setComments(data.comments);
  }, [data]);

  useEffect(() => {
    saveData &&
      saveData.data &&
      saveData.data.saveComment &&
      setComments([...comments, saveData.data.saveComment]);
  }, [saveData]);

  if (error) return "Pô, deu ruim demais.";

  function handleSubmit(values) {
    saveComment({ variables: values });
  }

  return (
    <>
      <h1>RocketComments</h1>
      <Form onSubmit={handleSubmit} />
      {loading ? (
        "Carregando..."
      ) : (
        <section className="comments">
          {comments.map(({ id, name, content }) => (
            <Comment key={id} name={name} description={content} />
          ))}
        </section>
      )}
    </>
  );
}

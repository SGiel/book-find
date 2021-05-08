import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { DELETE_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const user = data?.getMe || [];
  // const count = data?.getMe?.bookCount || 0;
  const [userData, setUserData] = useState({user});
  const loggedIn = Auth.loggedIn();
  
  const getUserData = async (userData) => {
    if (userData) setUserData(userData)
  }
  useEffect(() => {
    getUserData(user)
  })
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      console.log("======== bookId ========", bookId)
      const  updatedUser  = await deleteBook({
        variables: { bookId }
      });

      // NOTHING IN updatedUser HERE AFTER DELETEBOOK
      console.log("******** I AM HERE ********", updatedUser)
      if (updatedUser) {
        // const updatedUser = await data.json();
        console.log("$$$$$", bookId, "$$$$$$$")
        // Updates userData
        setUserData(updatedUser);
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };
      
      
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {loggedIn &&  userData?.savedBooks?.length
          // {loggedIn && userData && userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <h3>
          {!loggedIn &&
             ('You need to login to save books.')}
        </h3>
        <CardColumns>
        
          { loading && "Still Loading..." }
           {!loading && userData && userData.savedBooks && userData.savedBooks.map((book) => {
           return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title> <a href={book.link} target="_blank" > <span>{book.title}</span></a> </Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;

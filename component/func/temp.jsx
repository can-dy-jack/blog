export default () => {
    const [likes, increaseLikes] = React.useState(0);

  return (
    <>
      <p>
        {`${likes} likes`}
      </p>
      <button className='btn' onClick={() => increaseLikes(likes + 1)}>Like</button>
    </>
  );
} 
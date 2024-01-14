import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BacakButton() {
  const naviagte = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        naviagte(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BacakButton;

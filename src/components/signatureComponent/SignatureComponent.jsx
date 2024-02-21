import React, {
  // useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import useIsMobile from '../../hooks/useIsMobile';

const SignatureComponent = ({ onGenerateSign }, ref) => {
  //   const [sign, setSign] = useState();
  // const [url, setURL] = useState();
  const signatureRef = useRef();
  const isMobile = useIsMobile();

  useImperativeHandle(ref, () => ({
    generateSign: () => {
      const generatedURL = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      // setURL(generatedURL);
      onGenerateSign(generatedURL);
    },
    clear: () => {
      signatureRef.current.clear();
    },
  }));

  return (
    <>
      <div
        style={{
          border: 'solid black 1px',
          width: isMobile ? 300 : 400,
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <SignatureCanvas
          canvasProps={{
            width: isMobile ? 300 : 399,
            height: 150,
            className: 'sigCanvas',
          }}
          ref={signatureRef}
        />
      </div>
      <br />
      <button
        style={{
          border: 'solid 1px red',
          padding: '5px',
          borderRadius: '5px',
          width: '60px',
        }}
        onClick={() => ref.current.clear()}
      >
        Clear
      </button>
    </>
  );
};

export default forwardRef(SignatureComponent);

import React from 'react';

function MyComponent() {
  // Define the script and iframe content as strings
  const script1 = `<script src="https://donorbox.org/widget.js" paypalExpress="false"></script>`;
  const script2 = `<script src="https://donorbox.org/widget.js" paypalExpress="false"></script>`;

  const iframe1 = `
    <iframe
      src="https://donorbox.org/embed/whisper-developers"
      name="donorbox"
      allowpaymentrequest="allowpaymentrequest"
      seamless="seamless"
      frameborder="0"
      scrolling="no"
      height="1100px"
      width="100%"
      style="max-width: 500px; min-width: 250px; max-height:none!important;"
    ></iframe>
  `;

  const iframe2 = `
    <iframe
      frameborder="0"
      name="donorbox"
      scrolling="no"
      seamless="seamless"
      src="https://donorbox.org/embed/whisper-developers?donor_wall_color=%2397b6eb&amp;only_donor_wall=true"
      style="width: 100%; max-width:500px; min-width:310px; min-height: 345px;"
    ></iframe>
  `;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{marginTop: '25px', marginRight: '100px' }}>
        <div dangerouslySetInnerHTML={{ __html: script1 }} />
        <div dangerouslySetInnerHTML={{ __html: iframe1 }} />
      </div>

      <div style={{marginTop: '25px' }}>
        <div dangerouslySetInnerHTML={{ __html: script2 }} />
        <div dangerouslySetInnerHTML={{ __html: iframe2 }} />
      </div>
    </div>
  );
}

export default MyComponent;

// pages/_app.js

import React from 'react';
import Head from 'next/head';
import  '../public/styles/styles.css'; // Replace with the correct path to your CSS file

function MyApp({ Component, pageProps }) {
  return (
    <>

      <Head>
        {/* Add any other head tags or meta here if needed */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;


import Link from 'next/link';
import Head from 'next/head';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - Pet Adoption Portal</title>
        <meta name="description" content="The page you are looking for does not exist" />
      </Head>
      
      <div className="not-found-page text-center py-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link href="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
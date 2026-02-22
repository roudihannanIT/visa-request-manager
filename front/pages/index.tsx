import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Visa Manager | Germany Visa Applications</title>
        <meta name="description" content="Manage your Germany visa applications and documents" />
      </Head>

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-2xl">
          <h1 className="text-5xl font-bold mb-4">🇩🇪 Visa Request Manager</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Your personal assistant for Germany visa applications. 
            Track documents, deadlines, and interviews all in one place.
          </p>
          <Link 
            href="/applications/new" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Your Application →
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 py-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Track Applications</h3>
            <p className="text-gray-600">
              Keep track of all your visa applications in one dashboard
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📎</div>
            <h3 className="text-xl font-semibold mb-2">Manage Documents</h3>
            <p className="text-gray-600">
              Organize required documents and mark them as ready
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Never Miss Deadlines</h3>
            <p className="text-gray-600">
              Set interview dates and document deadlines
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-gray-100 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to start your Germany journey?</h2>
          <p className="text-gray-600 mb-6">Join hundreds of successful applicants</p>
          <Link 
            href="/dashboard" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard →
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
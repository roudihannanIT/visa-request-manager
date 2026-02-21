import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Visa Manager | Germany Visa Applications</title>
        <meta name="description" content="Manage your Germany visa applications and documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🇩🇪 Visa Request Manager
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Organize your Germany visa applications, track documents, 
              and never miss an appointment
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">125+</div>
              <div className="text-gray-600">Applications Managed</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-gray-600">Active Applications</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg font-semibold transition">
              ➕ Create New Application
            </button>
          </div>

          {/* Recent Applications Preview */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Applications</h2>
            <div className="grid gap-4">
              {/* Application Card Placeholder */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow p-6">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
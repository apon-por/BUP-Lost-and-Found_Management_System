import React, { useEffect, useState } from 'react';
import {
  createRoot
} from 'react-dom/client';

import {
  BrowserRouter,
  useNavigate,
  useParams,
  Link,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './style.css';


/* =========================================================
   API HELPER
========================================================= */

const api = async (p, o = {}) => {

  let h = {
    ...(o.headers || {})
  };

  let t = localStorage.token;

  if (t) {
    h.Authorization = 'Bearer ' + t;
  }

  if (!(o.body instanceof FormData)) {
    h['Content-Type'] = 'application/json';
  }

  let r = await fetch('/api' + p, {
    ...o,
    headers: h
  });

  let d = await r.json().catch(() => ({}));

  if (!r.ok) {
    throw Error(d.error || 'Request failed');
  }

  return d;
};


/* =========================================================
   NAVIGATION
========================================================= */

function Nav({ u, out }) {
  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand" aria-label="BUP Lost and Found home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 42 42" role="img">
              <path d="M21 4 5 12v12l16 11 16-11V12L21 4Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M13 13v13l8 5 8-5V13l-8 5-8-5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M21 18v13" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span><strong>BUP</strong> Lost &amp; Found</span>
        </Link>

        <div className="nav-links">
          <Link className="nav-link" to="/search"><span className="nav-symbol" aria-hidden="true">⌕</span> Search</Link>
          {u ? (
            <>
              <Link className="nav-link" to="/dashboard"><span className="nav-symbol" aria-hidden="true">▦</span> Dashboard</Link>
              <Link className="nav-link" to="/report/lost"><span className="nav-symbol" aria-hidden="true">＋</span> Report Lost</Link>
              <Link className="nav-link" to="/report/found"><span className="nav-symbol" aria-hidden="true">▤</span> Report Found</Link>
              <Link className="nav-link" to="/claims"><span className="nav-symbol" aria-hidden="true">✓</span> Claims</Link>
              <Link className="nav-link" to="/notifications"><span className="nav-symbol" aria-hidden="true">♧</span> Notifications</Link>
              {u.role === 'admin' && <Link className="nav-link nav-admin" to="/admin">Admin</Link>}
              {u.role === 'admin' && <Link className="nav-link nav-admin" to="/tracking">Tracking</Link>}
              <span className="nav-divider" aria-hidden="true" />
              <button className="btn btn-logout" onClick={out}><span aria-hidden="true">↪</span> Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="btn btn-register" to="/register">Create account</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

/* =========================================================
   ROUTE GUARD
========================================================= */

const Guard = ({
  u,
  admin = false,
  children
}) => {

  if (!u) {
    return <Navigate to="/login" />;
  }

  if (admin && u.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};


/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <main className="home-page">
      <section className="hero hero-modern">
        <div className="hero-copy">
          <div className="eyebrow"><span className="gold-rule" /> Bangladesh University of Professionals</div>
          <h1>BUP Lost &amp; Found <span>Management System</span></h1>
          <p className="hero-description">A smarter way to report, search, and recover lost belongings on campus.</p>
          <div className="hero-actions">
            <Link className="btn btn-hero-primary" to="/search"><span className="cta-icon" aria-hidden="true">⌕</span> Search Items <span className="cta-arrow" aria-hidden="true">›</span></Link>
            <Link className="btn btn-hero-secondary" to="/report/lost"><span className="cta-icon" aria-hidden="true">▤</span> Report an Item <span className="cta-arrow" aria-hidden="true">›</span></Link>
          </div>
          <div className="hero-caption"><span className="caption-dot" /> Campus-connected. Community-powered. Easy to use.</div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-cloud cloud-one" />
          <div className="art-cloud cloud-two" />
          <div className="art-route route-one" />
          <div className="art-pin">⌖</div>
          <div className="float-item float-bag">▣</div>
          <div className="float-item float-laptop">▰</div>
          <div className="float-item float-key">⚿</div>
          <div className="float-item float-id">▤</div>
          <div className="campus-scene">
            <div className="campus-tower tower-left"><i /><i /><i /><i /></div>
            <div className="campus-building">
              <div className="building-roof" />
              <div className="building-sign">BUP</div>
              <div className="building-windows"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="building-door" />
            </div>
            <div className="campus-wing"><i /><i /><i /><i /><i /><i /></div>
            <div className="campus-steps" />
            <div className="tree tree-one"><i /><b /></div>
            <div className="tree tree-two"><i /><b /></div>
            <div className="tree tree-three"><i /><b /></div>
            <div className="ground-line" />
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <div className="section-heading">
          <span className="gold-rule centered-rule" />
          <h2>How can we help?</h2>
          <p>Quick actions to report, find, and recover lost or found items on campus.</p>
        </div>
        <div className="grid action-grid">
          <Link className="action-card action-report" to="/report/lost">
            <span className="action-icon" aria-hidden="true">▤<b>＋</b></span>
            <span className="action-copy"><strong>Report an Item</strong><small>Share details of a lost or found belonging.</small></span>
            <span className="action-arrow" aria-hidden="true">›</span>
          </Link>
          <Link className="action-card action-search" to="/search">
            <span className="action-icon" aria-hidden="true">⌕</span>
            <span className="action-copy"><strong>Find What Matters</strong><small>Search reports by category and location.</small></span>
            <span className="action-arrow" aria-hidden="true">›</span>
          </Link>
          <Link className="action-card action-verify" to="/claims">
            <span className="action-icon" aria-hidden="true">◇</span>
            <span className="action-copy"><strong>Verify &amp; Recover</strong><small>Submit ownership claims for review.</small></span>
            <span className="action-arrow" aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      <section className="trust-strip" aria-label="Platform benefits">
        <div><span aria-hidden="true">♧</span> For the BUP community</div>
        <i />
        <div><span aria-hidden="true">▣</span> Secure reporting</div>
        <i />
        <div><span aria-hidden="true">✓</span> Admin-verified listings</div>
      </section>
      <footer className="home-footer">BUP Lost &amp; Found Management System <span>·</span> Bangladesh University of Professionals</footer>
    </main>
  );
}

/* =========================================================
   CARD
========================================================= */

function Card({ t, p }) {

  return (
    <div className="card">

      <h3>
        {t}
      </h3>

      <p>
        {p}
      </p>

    </div>
  );
}


/* =========================================================
   AUTH
========================================================= */

function Auth({
  register,
  setUser
}) {

  let nav = useNavigate();

  let [f, setF] = useState(
    register
      ? {
          name: '',
          email: '',
          password: '',
          role: 'student',
          phone: '',
          department: ''
        }
      : {
          email: '',
          password: ''
        }
  );

  let [e, setE] = useState('');


  async function go(x) {

    x.preventDefault();

    try {

      let d = await api(
        register
          ? '/auth/register'
          : '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(f)
        }
      );

      localStorage.token = d.token;

      localStorage.user = JSON.stringify(
        d.user
      );

      setUser(d.user);

      nav('/dashboard');

    } catch (x) {

      setE(x.message);

    }
  }


  return (
    <main className="narrow card">

      <h2>
        {register
          ? 'Create Account'
          : 'Login'}
      </h2>

      {e && (
        <p className="err">
          {e}
        </p>
      )}

      <form onSubmit={go}>

        {register && (
          <>
            <label>
              Name

              <input
                required
                value={f.name}
                onChange={x =>
                  setF({
                    ...f,
                    name: x.target.value
                  })
                }
              />

            </label>


            <label>
              Role

              <select
                value={f.role}
                onChange={x =>
                  setF({
                    ...f,
                    role: x.target.value
                  })
                }
              >

                {[
                  'student',
                  'faculty',
                  'officer',
                  'staff'
                ].map(x => (
                  <option key={x}>
                    {x}
                  </option>
                ))}

              </select>

            </label>


            <label>
              Phone

              <input
                value={f.phone}
                onChange={x =>
                  setF({
                    ...f,
                    phone: x.target.value
                  })
                }
              />

            </label>


            <label>
              Department

              <input
                value={f.department}
                onChange={x =>
                  setF({
                    ...f,
                    department: x.target.value
                  })
                }
              />

            </label>

          </>
        )}


        <label>
          Email

          <input
            type="email"
            required
            value={f.email}
            onChange={x =>
              setF({
                ...f,
                email: x.target.value
              })
            }
          />

        </label>


        <label>
          Password

          <input
            type="password"
            required
            value={f.password}
            onChange={x =>
              setF({
                ...f,
                password: x.target.value
              })
            }
          />

        </label>


        <button className="btn">
          {register
            ? 'Register'
            : 'Login'}
        </button>

      </form>

    </main>
  );
}


/* =========================================================
   USER DASHBOARD
========================================================= */

function Dash({ u }) {

  let [i, setI] = useState([]);
  let [c, setC] = useState([]);

  useEffect(() => {

    api('/my-items')
      .then(setI)
      .catch(() => setI([]));

    api('/claims/my')
      .then(setC)
      .catch(() => setC([]));

  }, []);


  return (
    <main>

      <h2>
        Welcome, {u.name}
      </h2>


      <div className="grid stats">

        <Card
          t="My Reports"
          p={i.length}
        />

        <Card
          t="My Claims"
          p={c.length}
        />

        <Card
          t="Lost Reports"
          p={
            i.filter(
              x => x.item_type === 'lost'
            ).length
          }
        />

        <Card
          t="Found Reports"
          p={
            i.filter(
              x => x.item_type === 'found'
            ).length
          }
        />

      </div>


      <div className="card">

        <h3>
          My Reports
        </h3>

        <table>

          <thead>

            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Status</th>
              <th>Verification</th>
            </tr>

          </thead>

          <tbody>

            {i.map(x => (

              <tr key={x.item_id}>

                <td>
                  <Link
                    to={'/items/' + x.item_id}
                  >
                    {x.item_name}
                  </Link>
                </td>

                <td>
                  {x.item_type}
                </td>

                <td>
                  {x.status}
                </td>

                <td>
                  {x.verification_status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}


/* =========================================================
   REPORT LOST / FOUND
========================================================= */

function Report({ type }) {

  let nav = useNavigate();

  let [c, setC] = useState([]);

  let [m, setM] = useState('');

  let [f, setF] = useState({});


  useEffect(() => {

    api('/categories')
      .then(setC)
      .catch(() => setC([]));

  }, []);


  async function go(e) {

    e.preventDefault();

    let d = new FormData();

    Object.entries(f).forEach(
      ([k, v]) => {

        if (v != null) {
          d.append(k, v);
        }

      }
    );


    try {

      let x = await api(
        '/' + type,
        {
          method: 'POST',
          body: d
        }
      );

      setM(x.message);

      setTimeout(
        () => nav('/dashboard'),
        800
      );

    } catch (x) {

      setM(x.message);

    }
  }


  return (
    <main className="narrow card">

      <h2>
        Report {type === 'lost'
          ? 'Lost'
          : 'Found'} Item
      </h2>


      {m && (
        <p className="note">
          {m}
        </p>
      )}


      <form onSubmit={go}>

        {[
          ['item_name', 'Item Name'],
          ['description', 'Description'],
          ['location', 'Location']
        ].map(
          ([k, l]) => (

            <label key={k}>

              {l}

              {k === 'description' ? (

                <textarea
                  required
                  onChange={x =>
                    setF({
                      ...f,
                      [k]: x.target.value
                    })
                  }
                />

              ) : (

                <input
                  required
                  onChange={x =>
                    setF({
                      ...f,
                      [k]: x.target.value
                    })
                  }
                />

              )}

            </label>

          )
        )}


        <label>
          Category

          <select
            required
            onChange={x =>
              setF({
                ...f,
                category_id: x.target.value
              })
            }
          >

            <option value="">
              Select
            </option>

            {c.map(x => (

              <option
                key={x.category_id}
                value={x.category_id}
              >
                {x.category_name}
              </option>

            ))}

          </select>

        </label>


        <label>
          Date

          <input
            required
            type="date"
            onChange={x =>
              setF({
                ...f,
                item_date: x.target.value
              })
            }
          />

        </label>


        <label>
          Image

          <input
            type="file"
            accept="image/*"
            onChange={x =>
              setF({
                ...f,
                image: x.target.files[0]
              })
            }
          />

        </label>


        <button className="btn">
          Submit Report
        </button>

      </form>

    </main>
  );
}


/* =========================================================
   SEARCH
========================================================= */

function Search() {

  let [i, setI] = useState([]);

  let [c, setC] = useState([]);

  let [f, setF] = useState({});


  async function go(e) {

    if (e) {
      e.preventDefault();
    }

    try {

      let d = await api(
        '/items?' +
        new URLSearchParams(f)
      );

      setI(d);

    } catch {

      setI([]);

    }
  }


  useEffect(() => {

    api('/categories')
      .then(setC)
      .catch(() => setC([]));

    go();

  }, []);


  return (
    <main>

      <h2>
        Search Items
      </h2>


      <form
        className="card filters"
        onSubmit={go}
      >

        <input
          placeholder="Item name or description"
          onChange={e =>
            setF({
              ...f,
              q: e.target.value
            })
          }
        />


        <select
          onChange={e =>
            setF({
              ...f,
              type: e.target.value
            })
          }
        >

          <option value="">
            All
          </option>

          <option value="lost">
            Lost
          </option>

          <option value="found">
            Found
          </option>

        </select>


        <select
          onChange={e =>
            setF({
              ...f,
              category: e.target.value
            })
          }
        >

          <option value="">
            All Categories
          </option>

          {c.map(x => (

            <option
              key={x.category_id}
              value={x.category_id}
            >
              {x.category_name}
            </option>

          ))}

        </select>


        <input
          placeholder="Location"
          onChange={e =>
            setF({
              ...f,
              location: e.target.value
            })
          }
        />


        <input
          type="date"
          onChange={e =>
            setF({
              ...f,
              date: e.target.value
            })
          }
        />


        <button className="btn">
          Search
        </button>

      </form>


      <div className="grid">

        {i.map(x => (

          <div
            className="card"
            key={x.item_id}
          >

            <b>
              {x.item_type}
            </b>

            <h3>
              {x.item_name}
            </h3>

            <p>
              {x.description}
            </p>

            <p>
              {x.category_name}
              {' · '}
              {x.location}
              {' · '}
              {String(
                x.item_date
              ).slice(0, 10)}
            </p>

            <p>
              Status: {x.status}
            </p>

            <Link
              className="btn"
              to={'/items/' + x.item_id}
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </main>
  );
}


/* =========================================================
   ITEM DETAILS
========================================================= */

function Detail({ u }) {

  let { id } = useParams();

  let [x, setX] = useState();

  let [v, setV] = useState('');

  let [m, setM] = useState('');


  useEffect(() => {

    api('/items/' + id)
      .then(setX);

  }, [id]);


  if (!x) {
    return (
      <main>
        Loading...
      </main>
    );
  }


  async function claim(e) {

    e.preventDefault();

    try {

      let d = await api(
        '/claims',
        {
          method: 'POST',
          body: JSON.stringify({
            item_id: x.item_id,
            verification_info: v
          })
        }
      );

      setM(d.message);

    } catch (e) {

      setM(e.message);

    }
  }


  return (
    <main className="narrow card">

      <b>
        {x.item_type}
      </b>

      <h2>
        {x.item_name}
      </h2>

      <p>
        {x.description}
      </p>

      <p>
        Category: {x.category_name}
        <br />
        Location: {x.location}
        <br />
        Date: {
          String(
            x.item_date
          ).slice(0, 10)
        }
        <br />
        Status: {x.status}
      </p>


      {x.image_path && (
        <img
          className="photo"
          src={
            '/uploads/' +
            x.image_path
          }
        />
      )}


      {x.item_type === 'found' &&
        u &&
        u.user_id !== x.user_id && (

          <form onSubmit={claim}>

            <h3>
              Submit Claim
            </h3>

            {m && (
              <p className="note">
                {m}
              </p>
            )}

            <label>
              Ownership verification information

              <textarea
                required
                value={v}
                onChange={e =>
                  setV(
                    e.target.value
                  )
                }
              />

            </label>

            <button className="btn">
              Submit Claim
            </button>

          </form>

        )}

    </main>
  );
}


/* =========================================================
   CLAIMS
========================================================= */

function Claims() {

  let [c, setC] = useState([]);


  useEffect(() => {

    api('/claims/my')
      .then(setC)
      .catch(() => setC([]));

  }, []);


  return (
    <main>

      <h2>
        My Claims
      </h2>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Location</th>
            </tr>

          </thead>

          <tbody>

            {c.map(x => (

              <tr key={x.claim_id}>

                <td>
                  {x.item_name}
                </td>

                <td>
                  {x.status}
                </td>

                <td>
                  {x.location}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notes() {

  let [n, setN] = useState([]);


  async function load() {

    try {

      setN(
        await api('/notifications')
      );

    } catch {

      setN([]);

    }

  }


  useEffect(() => {

    load();

  }, []);


  return (
    <main>

      <h2>
        Notifications
      </h2>

      <div className="grid">

        {n.map(x => (

          <div
            className="card"
            key={x.notification_id}
          >

            <p>
              {x.message}
            </p>

            {!x.is_read && (

              <button
                className="btn"
                onClick={async () => {

                  await api(
                    '/notifications/' +
                    x.notification_id +
                    '/read',
                    {
                      method: 'PUT'
                    }
                  );

                  load();

                }}
              >
                Mark as read
              </button>

            )}

          </div>

        ))}

      </div>

    </main>
  );
}


/* =========================================================
   REPORT CENTER
========================================================= */

function Reports() {

  let [summary, setSummary] =
    useState(null);

  let [data, setData] =
    useState([]);

  let [monthly, setMonthly] =
    useState([]);

  let [categories, setCategories] =
    useState([]);

  let [locations, setLocations] =
    useState([]);

  let [history, setHistory] =
    useState([]);

  let [filters, setFilters] =
    useState({});

  let [loading, setLoading] =
    useState(true);

  let [message, setMessage] =
    useState('');


  async function loadReports(
    currentFilters = filters
  ) {

    setLoading(true);

    try {

      let query =
        new URLSearchParams(
          Object.fromEntries(
            Object.entries(
              currentFilters
            ).filter(
              ([, v]) =>
                v !== '' &&
                v !== null &&
                v !== undefined
            )
          )
        ).toString();


      let [
        s,
        d,
        m,
        c,
        l,
        h
      ] = await Promise.all([

        api('/reports/summary'),

        api(
          '/reports/data' +
          (query ? '?' + query : '')
        ),

        api('/reports/monthly'),

        api('/reports/categories'),

        api('/reports/locations'),

        api('/reports/history')

      ]);


      setSummary(s);
      setData(d);
      setMonthly(m);
      setCategories(c);
      setLocations(l);
      setHistory(h);

    } catch (e) {

      setMessage(e.message);

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadReports({});

  }, []);


  function changeFilter(
    key,
    value
  ) {

    setFilters({
      ...filters,
      [key]: value
    });

  }


  async function applyFilters(e) {

    e.preventDefault();

    loadReports(filters);

  }


  async function resetFilters() {

    let empty = {};

    setFilters(empty);

    loadReports(empty);

  }


  
async function saveReportHistory() {
  try {
    setMessage('Generating PDF report...');

    const d = await api('/reports/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({
        report_name: 'BUP Lost & Found Comprehensive Report',
        report_type: 'Comprehensive Report',
        filters: filters
      })
    });

    setMessage('PDF generated successfully!');

    const h = await api('/reports/history');
    setHistory(h);

    window.open(d.download_url, '_blank');

  } catch (e) {
    setMessage('PDF generation failed: ' + e.message);
  }
}



  if (loading && !summary) {

    return (
      <div className="card">
        Loading Report Center...
      </div>
    );

  }


  return (
    <div>

      <div className="report-header">

        <div>

          <h2>
            Report Center
          </h2>

          <p>
            Analyze BUP Lost & Found system
            data and generate administrative reports.
          </p>

        </div>


        <button
          className="btn"
          onClick={saveReportHistory}
        >
          Save Report History
        </button>

      </div>


      {message && (

        <div className="card note">
          {message}
        </div>

      )}


      {/* SUMMARY CARDS */}

      {summary && (

        <div className="grid stats">

          <Card
            t="Total Users"
            p={summary.total_users}
          />

          <Card
            t="Total Lost"
            p={summary.total_lost}
          />

          <Card
            t="Total Found"
            p={summary.total_found}
          />

          <Card
            t="Total Claims"
            p={summary.total_claims}
          />

          <Card
            t="Pending Claims"
            p={summary.pending_claims}
          />

          <Card
            t="Returned Items"
            p={summary.returned_items}
          />

          <Card
            t="Pending Reports"
            p={summary.pending_reports}
          />

        </div>

      )}


      {/* FILTERS */}

      <div className="card">

        <h3>
          Report Filters
        </h3>

        <form
          className="filters"
          onSubmit={applyFilters}
        >

          <select
            value={
              filters.type || ''
            }
            onChange={e =>
              changeFilter(
                'type',
                e.target.value
              )
            }
          >

            <option value="">
              All Types
            </option>

            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>

          </select>


          <input
            placeholder="Category ID"
            value={
              filters.category || ''
            }
            onChange={e =>
              changeFilter(
                'category',
                e.target.value
              )
            }
          />


          <input
            placeholder="Location"
            value={
              filters.location || ''
            }
            onChange={e =>
              changeFilter(
                'location',
                e.target.value
              )
            }
          />


          <select
            value={
              filters.status || ''
            }
            onChange={e =>
              changeFilter(
                'status',
                e.target.value
              )
            }
          >

            <option value="">
              All Status
            </option>

            {[
              'Lost',
              'Found',
              'Claimed',
              'Returned',
              'Closed'
            ].map(x => (

              <option
                key={x}
                value={x}
              >
                {x}
              </option>

            ))}

          </select>


          <select
            value={
              filters.verification_status || ''
            }
            onChange={e =>
              changeFilter(
                'verification_status',
                e.target.value
              )
            }
          >

            <option value="">
              All Verification
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>


          <input
            type="date"
            value={
              filters.start_date || ''
            }
            onChange={e =>
              changeFilter(
                'start_date',
                e.target.value
              )
            }
          />


          <input
            type="date"
            value={
              filters.end_date || ''
            }
            onChange={e =>
              changeFilter(
                'end_date',
                e.target.value
              )
            }
          />


          <button className="btn">
            Apply Filters
          </button>


          <button
            type="button"
            onClick={resetFilters}
          >
            Reset
          </button>

        </form>

      </div>


      {/* MONTHLY ANALYTICS */}

      <div className="card">

        <h3>
          Monthly Lost vs Found
        </h3>

        {monthly.length === 0 ? (

          <p>
            No monthly data available.
          </p>

        ) : (

          <div className="analytics-list">

            {monthly.map(x => {

              let max =
                Math.max(
                  Number(x.lost) || 0,
                  Number(x.found) || 0,
                  1
                );

              return (

                <div
                  className="analytics-row"
                  key={x.month}
                >

                  <strong>
                    {x.month}
                  </strong>

                  <span>
                    Lost: {x.lost}
                  </span>

                  <div className="bar">

                    <div
                      style={{
                        width:
                          (
                            Number(x.lost) /
                            max *
                            100
                          ) + '%'
                      }}
                    />

                  </div>

                  <span>
                    Found: {x.found}
                  </span>

                  <div className="bar">

                    <div
                      style={{
                        width:
                          (
                            Number(x.found) /
                            max *
                            100
                          ) + '%'
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>


      {/* CATEGORY + LOCATION */}

      <div className="grid">

        <div className="card">

          <h3>
            Category Distribution
          </h3>

          {categories.map(x => (

            <div
              key={x.category}
              className="stat-line"
            >

              <span>
                {x.category}
              </span>

              <strong>
                {x.total}
              </strong>

            </div>

          ))}

        </div>


        <div className="card">

          <h3>
            Location Distribution
          </h3>

          {locations.map(x => (

            <div
              key={x.location}
              className="stat-line"
            >

              <span>
                {x.location}
              </span>

              <strong>
                {x.total}
              </strong>

            </div>

          ))}

        </div>

      </div>


      {/* DATA TABLE */}

      <div className="card">

        <div className="report-table-header">

          <h3>
            Report Data
          </h3>

          <span>
            {data.length} records
          </span>

        </div>


        <div className="table-scroll">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Item</th>
                <th>Type</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Reporter</th>

              </tr>

            </thead>


            <tbody>

              {data.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                  >
                    No records found.
                  </td>

                </tr>

              ) : (

                data.map(x => (

                  <tr
                    key={x.item_id}
                  >

                    <td>
                      {x.item_id}
                    </td>

                    <td>
                      {x.item_name}
                    </td>

                    <td>
                      {x.item_type}
                    </td>

                    <td>
                      {x.category_name ||
                        'N/A'}
                    </td>

                    <td>
                      {x.location}
                    </td>

                    <td>
                      {String(
                        x.item_date
                      ).slice(0, 10)}
                    </td>

                    <td>
                      {x.status}
                    </td>

                    <td>
                      {x.verification_status}
                    </td>

                    <td>
                      {x.reporter_name}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* REPORT HISTORY */}

      <div className="card">

        <div className="report-table-header">

          <h3>
            Generated Report History
          </h3>

          <span>
            {history.length} reports
          </span>

        </div>


        <div className="table-scroll">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Report Name</th>
                <th>Type</th>
                <th>Format</th>
                <th>Generated By</th>
                <th>Date</th>

              </tr>

            </thead>


            <tbody>

              {history.length === 0 ? (

                <tr>

                  <td colSpan="6">
                    No generated reports yet.
                  </td>

                </tr>

              ) : (

                history.map(x => (

                  <tr
                    key={x.report_id}
                  >

                    <td>
                      {x.report_id}
                    </td>

                    <td>
                      {x.report_name}
                    </td>

                    <td>
                      {x.report_type}
                    </td>

                    <td>
                      {x.file_format}
                    </td>

                    <td>
                      {x.generated_by_name}
                    </td>

                    <td>
                      {String(
                        x.generated_at
                      ).replace('T', ' ')}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */


/* =========================================================
   ITEM TRACKING REPORT
========================================================= */
function Tracking() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ q: '', type: '', status: '', verification: '', from: '', to: '' });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      setItems(await api('/tracking/items?' + params.toString()));
    } catch (e) { setError(e.message || 'Could not load tracking records.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openTimeline = async (id) => {
    try { setSelected(await api('/tracking/items/' + id)); }
    catch (e) { setError(e.message || 'Could not load timeline.'); }
  };
  const update = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const exportCsv = () => {
    const cols = ['tracking_id','item_id','item_name','item_type','reporter_name','reporter_email','category_name','location','item_date','status','verification_status','created_at','last_updated'];
    const quote = v => '"' + String(v ?? '').replaceAll('"','""') + '"';
    const csv = [cols.join(','), ...items.map(row => cols.map(c => quote(row[c])).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'BUP_Item_Tracking_Report.csv'; a.click(); URL.revokeObjectURL(url);
  };
  const dateText = v => v ? new Date(v).toLocaleString() : '—';

  return (
    <main className="page tracking-page">
      <section className="page-heading">
        <div className="eyebrow"><span className="gold-rule" /> ADMINISTRATION</div>
        <h1>Item Tracking Report</h1>
        <p>Track every lost and found report from submission through verification, claims and final status.</p>
      </section>
      <section className="tracking-kpis">
        <div className="tracking-kpi"><span>Total records</span><strong>{items.length}</strong><small>Matching current filters</small></div>
        <div className="tracking-kpi"><span>Pending verification</span><strong>{items.filter(x => x.verification_status === 'Pending').length}</strong><small>Awaiting admin review</small></div>
        <div className="tracking-kpi"><span>Lost reports</span><strong>{items.filter(x => x.item_type === 'lost').length}</strong><small>Within current results</small></div>
        <div className="tracking-kpi"><span>Returned items</span><strong>{items.filter(x => x.status === 'Returned').length}</strong><small>Successfully returned</small></div>
      </section>
      <section className="tracking-panel">
        <div className="tracking-toolbar">
          <div><h2>All item records</h2><p>Search by item, tracking ID, reporter or email.</p></div>
          <button className="btn btn-primary" onClick={exportCsv} disabled={!items.length}>Export CSV</button>
        </div>
        <div className="tracking-filters">
          <input aria-label="Search tracking records" placeholder="Search item, ID, reporter..." value={filters.q} onChange={e => update('q',e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} />
          <select aria-label="Type" value={filters.type} onChange={e => update('type',e.target.value)}><option value="">All types</option><option value="lost">Lost</option><option value="found">Found</option></select>
          <select aria-label="Status" value={filters.status} onChange={e => update('status',e.target.value)}><option value="">All statuses</option>{['Lost','Found','Claimed','Returned','Closed'].map(s => <option key={s}>{s}</option>)}</select>
          <select aria-label="Verification" value={filters.verification} onChange={e => update('verification',e.target.value)}><option value="">All verification</option>{['Pending','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}</select>
          <input aria-label="From date" type="date" value={filters.from} onChange={e => update('from',e.target.value)} />
          <input aria-label="To date" type="date" value={filters.to} onChange={e => update('to',e.target.value)} />
          <button className="btn btn-primary" onClick={load}>Apply filters</button>
          <button className="btn btn-secondary" onClick={() => { setFilters({q:'',type:'',status:'',verification:'',from:'',to:''}); setTimeout(() => { api('/tracking/items').then(setItems).catch(e => setError(e.message)); }, 0); }}>Reset</button>
        </div>
        {error && <div className="tracking-error" role="alert">{error} — confirm the tracking database migration has been applied.</div>}
        {loading ? <div className="tracking-empty">Loading tracking records…</div> : (
          <div className="table-wrap tracking-table-wrap"><table className="tracking-table">
            <thead><tr><th>Tracking ID</th><th>Item</th><th>Reported by</th><th>Type</th><th>Report date</th><th>Verification</th><th>Current status</th><th>Timeline</th></tr></thead>
            <tbody>{items.map(x => <tr key={x.item_id}>
              <td><strong className="tracking-id">{x.tracking_id}</strong></td>
              <td><strong>{x.item_name}</strong><small className="table-sub">{x.category_name || 'Uncategorized'} · {x.location}</small></td>
              <td>{x.reporter_name}<small className="table-sub">{x.reporter_email}</small></td>
              <td><span className={'tracking-type type-' + x.item_type}>{x.item_type}</span></td>
              <td>{dateText(x.created_at)}</td>
              <td><span className={'tracking-status status-' + String(x.verification_status).toLowerCase()}>{x.verification_status}</span></td>
              <td><span className="tracking-status">{x.status}</span></td>
              <td><button className="btn btn-small btn-secondary" onClick={() => openTimeline(x.item_id)}>View history</button></td>
            </tr>)}</tbody>
          </table>{!items.length && <div className="tracking-empty">No records match these filters.</div>}</div>
        )}
      </section>
      {selected && <div className="tracking-modal-backdrop" onClick={() => setSelected(null)}>
        <section className="tracking-modal" role="dialog" aria-modal="true" aria-label="Item tracking timeline" onClick={e => e.stopPropagation()}>
          <button className="tracking-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          <div className="eyebrow"><span className="gold-rule" /> ITEM LIFECYCLE</div>
          <h2>{selected.item.item_name}</h2>
          <p className="tracking-id">{selected.item.tracking_id}</p>
          <div className="tracking-detail-grid"><div><span>Reporter</span><strong>{selected.item.reporter_name}</strong></div><div><span>Location</span><strong>{selected.item.location}</strong></div><div><span>Current status</span><strong>{selected.item.status}</strong></div><div><span>Verification</span><strong>{selected.item.verification_status}</strong></div></div>
          <h3>Tracking timeline</h3>
          <div className="tracking-timeline">{selected.events.map((ev, i) => <div className="timeline-event" key={ev.event_id || i}><span className="timeline-dot" /><div><strong>{ev.title}</strong><p>{ev.description}</p><time>{dateText(ev.created_at)}</time></div></div>)}</div>
          <h3>Claims</h3>
          {selected.claims.length ? <div className="tracking-claims">{selected.claims.map(c => <div key={c.claim_id}><strong>Claim #{c.claim_id} · {c.status}</strong><p>{c.claimant_name} ({c.claimant_email})</p><small>Submitted: {dateText(c.created_at)}{c.reviewed_at ? ' · Reviewed: ' + dateText(c.reviewed_at) : ''}</small></div>)}</div> : <p>No claims have been submitted for this item.</p>}
        </section>
      </div>}
    </main>
  );
}



function Admin() {

  let [s, setS] =
    useState();

  let [it, setIt] =
    useState([]);

  let [cl, setCl] =
    useState([]);

  let [us, setUs] =
    useState([]);

  let [tab, setTab] =
    useState('summary');


  async function load() {

    try {

      let [
        summary,
        items,
        claims,
        users
      ] = await Promise.all([

        api('/reports/summary'),

        api('/admin/items'),

        api('/admin/claims'),

        api('/admin/users')

      ]);


      setS(summary);
      setIt(items);
      setCl(claims);
      setUs(users);

    } catch (e) {

      console.error(e);

    }
  }


  useEffect(() => {

    load();

  }, []);


  async function v(id, d) {

    await api(
      '/admin/items/' +
      id +
      '/verify',
      {
        method: 'PUT',
        body: JSON.stringify({
          decision: d
        })
      }
    );

    load();

  }


  async function r(id, d) {

    await api(
      '/admin/claims/' +
      id,
      {
        method: 'PUT',
        body: JSON.stringify({
          decision: d
        })
      }
    );

    load();

  }


  async function st(id, status) {

    await api(
      '/admin/items/' +
      id +
      '/status',
      {
        method: 'PUT',
        body: JSON.stringify({
          status
        })
      }
    );

    load();

  }


  return (
    <main>

      <h2>
        Administrator Dashboard
      </h2>


      {/* ADMIN TABS */}

      <div className="tabs">

        {[
          'summary',
          'items',
          'claims',
          'users',
          'reports'
        ].map(x => (

          <button
            key={x}
            onClick={() =>
              setTab(x)
            }
          >
            {x === 'reports'
              ? 'Reports'
              : x}
          </button>

        ))}

      </div>


      {/* SUMMARY */}

      {tab === 'summary' &&
        s && (

          <div className="grid stats">

            {Object.entries(s).map(
              ([k, v]) => (

                <Card
                  key={k}
                  t={k}
                  p={v}
                />

              )
            )}

          </div>

        )}


      {/* ITEMS */}

      {tab === 'items' && (

        <div className="card">

          <table>

            <thead>

              <tr>

                <th>Item</th>
                <th>Type</th>
                <th>Verification</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {it.map(x => (

                <tr
                  key={x.item_id}
                >

                  <td>
                    {x.item_name}
                  </td>

                  <td>
                    {x.item_type}
                  </td>

                  <td>
                    {x.verification_status}
                  </td>

                  <td>

                    <select
                      value={x.status}
                      onChange={e =>
                        st(
                          x.item_id,
                          e.target.value
                        )
                      }
                    >

                      {[
                        'Lost',
                        'Found',
                        'Claimed',
                        'Returned',
                        'Closed'
                      ].map(z => (

                        <option
                          key={z}
                        >
                          {z}
                        </option>

                      ))}

                    </select>

                  </td>


                  <td>

                    {x.verification_status ===
                      'Pending' && (

                      <>

                        <button
                          onClick={() =>
                            v(
                              x.item_id,
                              'Approved'
                            )
                          }
                        >
                          Approve
                        </button>

                        {' '}

                        <button
                          onClick={() =>
                            v(
                              x.item_id,
                              'Rejected'
                            )
                          }
                        >
                          Reject
                        </button>

                      </>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* CLAIMS */}

      {tab === 'claims' && (

        <div className="card">

          <table>

            <thead>

              <tr>

                <th>Item</th>
                <th>Claimant</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {cl.map(x => (

                <tr
                  key={x.claim_id}
                >

                  <td>
                    {x.item_name}
                  </td>

                  <td>
                    {x.claimant_name}
                  </td>

                  <td>
                    {x.status}
                  </td>

                  <td>

                    {x.status ===
                      'Pending' && (

                      <>

                        <button
                          onClick={() =>
                            r(
                              x.claim_id,
                              'Approved'
                            )
                          }
                        >
                          Approve
                        </button>

                        {' '}

                        <button
                          onClick={() =>
                            r(
                              x.claim_id,
                              'Rejected'
                            )
                          }
                        >
                          Reject
                        </button>

                      </>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* USERS */}

      {tab === 'users' && (

        <div className="card">

          <table>

            <thead>

              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>

              </tr>

            </thead>


            <tbody>

              {us.map(x => (

                <tr
                  key={x.user_id}
                >

                  <td>
                    {x.name}
                  </td>

                  <td>
                    {x.email}
                  </td>

                  <td>
                    {x.role}
                  </td>

                  <td>
                    {x.department}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* REPORT CENTER */}

      {tab === 'reports' && (

        <Reports />

      )}

    </main>
  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  let [u, setU] =
    useState(
      () =>
        JSON.parse(
          localStorage.user || 'null'
        )
    );


  function out() {

    localStorage.clear();

    setU(null);

  }


  return (
    <>
      <Nav
        u={u}
        out={out}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={
            <Auth
              setUser={setU}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Auth
              register
              setUser={setU}
            />
          }
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/items/:id"
          element={
            <Detail
              u={u}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Guard u={u}>
              <Dash u={u} />
            </Guard>
          }
        />

        <Route
          path="/report/lost"
          element={
            <Guard u={u}>
              <Report type="lost" />
            </Guard>
          }
        />

        <Route
          path="/report/found"
          element={
            <Guard u={u}>
              <Report type="found" />
            </Guard>
          }
        />

        <Route
          path="/claims"
          element={
            <Guard u={u}>
              <Claims />
            </Guard>
          }
        />

        <Route
          path="/notifications"
          element={
            <Guard u={u}>
              <Notes />
            </Guard>
          }
        />

        <Route
          path="/admin"
          element={
            <Guard
              u={u}
              admin
            >
              <Admin />
            </Guard>
          }
        />

        <Route
          path="/tracking"
          element={
            <Guard u={u} admin>
              <Tracking />
            </Guard>
          }
        />

      </Routes>

    </>
  );
}


/* =========================================================
   ROOT
========================================================= */

createRoot(
  document.getElementById('root')
).render(

  <BrowserRouter>

    <App />

  </BrowserRouter>

);
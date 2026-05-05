import React, { useState } from 'react'
import './Homepage.css'

const RECENT = [
  {id: 1, title: 'Sweet Boy', artist: 'Malcolm Todd', rating: 5, color: '#d4a853'},
  {id: 2, title: 'Superclean', artist: 'The Marías', rating: 1, color: '#2d6a4f'},
  {id: 3, title: 'Currents', artist: 'Tame Impala', rating: 4, color: '#5e4b8b'},
  {id: 4, title: 'Random Access Memories', artist: 'Daft Punk', rating: 4, color: '#c9a14a'},
  {id: 5, title: 'Melt', artist: 'Yumi Zouma', rating: 4, color: '#b5c4d1'},
  {id: 6, title: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', rating: 5, color: '#8b3a3a'},
  {id: 7, title: 'In Rainbows', artist: 'Radiohead', rating: 5, color: '#4a7c59'},
  {id: 8, title: 'Immunity', artist: 'Clairo', rating: 4, color: '#c2a8d0'},
]

const TRENDING = [
  {id: 9, title: 'Cromakopia', artist: 'Tyler, The Creator', color: '#c8b560'},
  {id: 10, title: 'Short n Sweet', artist: 'Sabrina Carpenter', color: '#e8a0b4'},
  {id: 11, title: 'Manning Fireworks', artist: 'MJ Lenderman', color: '#8aab78'},
  {id: 12, title: 'Imaginals', artist: 'Big Thief', color: '#6a8fd8'},
  {id: 13, title: 'Bright Future', artist: 'Adrianne Lenker', color: '#c4a882'},
  {id: 14, title: 'The Great Impersonator', artist: 'Halsey', color: '#9b7bb5'}
]

const ACTIVITY = [
  {user: 'John Doe', action: 'reviewed', album: 'Currents', artist: 'Tame Impala', rating: 4 },
  {user: 'Jane Smith', action: 'logged', album: 'Melt', artist: 'Yumi Zouma', rating: 4 },
  { user: 'Alice Johnson', action: 'wants to hear', album: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', rating: null },
  { user: 'Bob Brown', action: 'reviewed', album: 'In Rainbows', artist: 'Radiohead', rating: 5 },
]

const NAV_ITEMS = ['Home', 'Discover', 'List', 'Friends', 'Settings']

function StarRating ( { rating, max = 5 }) {
  return (
    <div className="rt-stars">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? 'rt-star filled' : 'rt-star'}>*</span>
      ))}
    </div>
  )
}

function AlbumCard({ album }) {
  const [ hovered, setHovered ] = useState(false);
  const artStyle = {
    background: 'linear-gradient(135deg, ' + album.color + 'cc, ' + album.color + '66)',}
    const vinylStyle = { borderColor: album.color + 'cc' }

  return (
  <div className="rt-album-card" 
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)}>
      <div className='rt-album-art' style={artStyle}>
        <div className = 'rt-album-vinyl' style={vinylStyle}></div>
        {hovered && (
          <div className='rt-album-overlay'>
            <button className='rt-log-btn'>+ Log</button>
          </div>
        )}
      </div>
      <div className = 'rt-album-meta'>
        <p className = 'rt-album-title'>{album.title}</p>
        <p className = 'rt-album-artist'>{album.artist}</p>
        {album.rating && <StarRating rating={album.rating} />}
      </div>
    </div>
  )
}

// function NavDrawer({ open, onClose }) {
//   const navItems = ['Home', 'Discover', 'My Library', 'Lists', 'Friends', 'Settings'];
//   return (
//     <React.Fragment>
//       <div className={open ? 'rt-backdrop open' : 'rt-backdrop'} onClick={onClose} />
//       <nav className={open ? 'rt-drawer open' : 'rt-drawer'}>
//         <div className="rt-drawer-header">
//           <span className="rt-logo-text">LetsTalkMusic</span>
//           <button className="rt-icon-btn" onClick={onClose}>X</button>
//         </div>
//         <ul className="rt-nav-list">
//           {navItems.map((item, index) => (
//             <li key={index} className="rt-nav-item">
//               <span>{item}</span>
//             </li>
//           ))}
//           </ul>
//           <div className="rt-drawer-footer">
//             <p className="rt-stat-label">Albums logged</p>
//             <p className="rt-stat-val">142</p>
//           </div>
//       </nav>
//     </React.Fragment>
//   )
// }

function Sidebar ({ active, setActive }) {
  return (
    <aside className = "rt-sidebar">
      <div className="rt-side-logo">returnify</div>
      <nav className="rt-sidebar-nav">
        {NAV_ITEMS.map(function(label) {
          return (
            <button key={label} 
            className={active === label ? 'rt-nav-item active' : 'rt-nav-item'}
            onClick={() => setActive(label)}>{label}</button>
          )
        })}
      </nav>
      <div className="rt-sidebar-footer">
        <div className="rt-user-row">
          <div className="rt-pfp-btn">J</div>
          <div className="rt-user-info">
            <p className="rt-user-name">Jeong Jeong</p>
            <p className="rt-user-stat">142 albums logged</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function Tabs() {
  const [active, setActive] = useState('For You')
  const tabs = ['For You', 'Following', 'New Releases', 'Charts']
  return (
    <div className='rt-tabs'>
      {tabs.map(function(tab) {
        return (
          <button key = {tab} className={active === tab ? 'rt-tab active' : 'rt-tab'} onClick={() => setActive(tab)}>
            {tab}
          </button>
        )
      })}
    </div>
  )
}

export default function Homepage() {
  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const navButtons = ['Home', 'Discover', 'Library', 'Lists', 'Friends']
  const[activeNav, setActiveNav] = useState('Home')

  return (
    // <div className="rt-root">
    //   <header className="rt-header">
    //     <button className = "rt-menu-btn" onClick={() => setDrawerOpen(true)}>
    //       <span></span>
    //       <span></span>
    //       <span></span>
    //     </button>
    //     <span className="rt-logo-text">LetsTalkMusic</span>
    //     <div className = "rt-header-right">
    //       <button className="rt-pfp-btn">J</button>
    //     </div>
    //   </header>

    //   <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

    //   <main className="rt-main">
    //     <section className = "rt-hero">
    //       <div className="rt-hero-text">
    //         <p className="rt-hero-eyebrow">Your weekly digest</p>
    //         <h1 className="rt-hero-title">Keep the needle moving.</h1>
    //         <p className="rt-hero-sub">
    //           You have logged <strong>12 albums</strong> this month.
    //         </p>
    //         <button className="rt-cta-btn">Browse New Releases</button>
    //       </div>
    //       <div className="rt-hero-stack">
    //         {RECENT.map(function(a) { return <AlbumCard key={a.id} album={a} />})}
    //       </div>
    //     </section>

    //     <section className="rt-section">
    //       <div className="rt-section-header">
    //         <h2 className="rt-section-title">Trending This Week</h2>
    //         <button className="rt-see-all">See all</button>
    //       </div>
    //       <div className="rt-section">
    //         <div className="rt-section-header">
    //           <h2 className="rt-section-title">Friends Activity</h2>
    //           <button className="rt-see-all">See all</button>
    //         </div>
            
    //         <ul className="rt-activity-list">
    //           {ACTIVITY.map(function(item, i){
    //             return (
    //               <li key={i} className="rt-activity-item">
    //                 <div className="rt-activity-avatar">{item.user[0].toUpperCase()}</div>
    //                 <div className="rt-activity-body">
    //                   <p className="rt-activity-text">
    //                     <strong>{item.user}</strong> {' '}{item.action}{' '} 
    //                     <em>{item.album}</em>{' by '}{item.artist}
    //                   </p>
    //                   {item.rating && <StarRating rating={item.rating} />}
    //                 </div>
    //                 <span className="rt-activity-time">{item.time}</span>
    //               </li>
    //             )
    //           })}
    //         </ul>
    //       </div>
    //     </section>
    //   </main>
      
    //   <footer className="rt-bottom-nav">
    //     {navButtons.map(function(label) {
    //       return (
    //         <button key={label} className={label === 'Home' ? 'rt-bnav-btn active' : 'rt-bnav-btn'}>
    //           <span className="rt-bnav-icon">{label}</span>
    //           </button>
    //       )
    //     })}
    //   </footer>
    // </div>
    <div className="rt-root">
      <Sidebar active={activeNav} setActive={setActiveNav}></Sidebar>

      <div className="rt-content">
        <header className="rt-topbar">
          <div className="rt-topbar-left">
            <h1 className="rt-page-title">Good evening, Jesper</h1>
            <p className="rt-page-sub">Here is what is happening in your music world.</p>
          </div>
          <div className="rt-topbar-right">
            {/* search bar goes here */}
            {/* Might want to implement this section into discover */}
            <span className-search-icon>Search</span>
            <input className="rt-search-input" type="text" placeholder="Search albums, artists...." />
          </div>
          <div className="rt-pfp-btn">J</div>
        </header>
        <main className="rt-main">
          <section className="rt-hero">
            {/* Stats go here */}
            <div className="rt-hero-text">
              <p className="rt-hero-eyebrow">Your weekly digest</p>
              <h2 className="rt-hero-title">Keep the needle moving.</h2>
              <p className="rt-hero-sub">
                You have logged <strong>12 albums</strong> this month, 3 more than last month. Keep it up.
              </p>
              <div className="rt-hero-stats">
                <div className="rt-stat-pill">
                  <span className='rt-stat-num'>142</span>
                  <span className="rt-stat-lbl">Total Logged</span>
                </div>
                <div className="rt-stat-pill">
                  <span className="rt-stat-num">4.1</span>
                  <span className="rt-stat-lbl">Avg Rating</span>
                </div>
                <div className="rt-stat-pill">
                  <span className="rt-stat-num">38</span>
                  <span className="rt-stat-lbl">Reviews Written</span>
                </div>
              </div>
              <button className="rt-cta-btn">Browse New Releases</button>
            </div>
            <div className="rt-hero-stack">
              {RECENT.slice(0, 4).map(function(a, i) {
                var s = {
                  background: 'linear-gradient(135deg, ' + a.color + 'dd, ' + a.color + '77)', 
                  transform: 'rotate(' + ((i - 1.5) * 7) + 'deg) translateY(' + (i * 6) + 'px)',
                  zIndex: 4 - i,
                }
                return (
                  <div key={a.id} className="rt-hero-record" style={s}>
                    <div className="rt-record-inner"/>
                  </div>
                )
              })}
            </div>
          </section>

          <Tabs />

          <div className="rt-two-col">
            <div className="rt-col-main">
              <section className="rt-section">
                {/* Recently Logged goes here */}
                <div className="rt-section-header">
                  <h3 className="rt-section-title">Recently Logged</h3>
                  <button className="rt-see-all">See All</button>
                </div>
                <div className="rt-grid rt-grid-4">
                  {RECENT.map(function(a) { return <AlbumCard key={a.id} album={a} />})}
                </div>
              </section>

              <section className="rt-section">
                {/* Trending Map goes here */}
                <div className="rt-section-header">
                  <h3 className="rt-section-title">Trending This Week</h3>
                  <button className="rt-see-all">See All</button>
                </div>
                <div className="rt-grid rt-grid-6">
                  {TRENDING.map(function(a) { return <AlbumCard key={a.id} album={a} />})}
                </div>
              </section>
            </div>

            {/* Activity goes here */}
            <aside className="rt-col-side">
              <section className="rt-section">
                {/* Activity List goes here */}
                <div className="rt-section-header">
                  <h3 className="rt-section-title">Popular Activity</h3>
                  <button className="rt-see-all">See All</button>
                </div>
                <ul className="rt-activity-list">
                  {ACTIVITY.map(function(item, i){
                    return (
                      <li key={i} className="rt-activity-item">
                        <div className="rt-activity-avatar">{item.user[0].toUpperCase()}</div>
                        <div className="rt-activity-body">
                          <p className="rt-activity-text">
                            <strong>{item.user}</strong>{' '}{item.action}{' '}
                            <em>{item.album}</em> {' by '}{item.artist}
                          </p>
                          {item.rating && <StarRating rating={item.rating} />}
                          <span className="rt-activity-time">{item.time}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
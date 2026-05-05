import React, { useState } from 'react';
import './styles/Homepage.css';
import { Rating, Pagination } from '@mui/material';

// --- Data --------------------------------------------------------------
const RECENT = [
  { id: 1, title: 'Sweet Boy', artist: 'Malcolm Todd', rating: 5, color: '#d4a853' },
  { id: 2, title: 'Superclean', artist: 'The Marías', rating: 1, color: '#2d6a4f' },
  { id: 3, title: 'Currents', artist: 'Tame Impala', rating: 4, color: '#5e4b8b' },
  { id: 4, title: 'Random Access Memories', artist: 'Daft Punk', rating: 4, color: '#c9a14a' },
  { id: 5, title: 'Melt', artist: 'Yumi Zouma', rating: 4, color: '#b5c4d1' },
  { id: 6, title: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', rating: 5, color: '#8b3a3a' },
  { id: 7, title: 'In Rainbows', artist: 'Radiohead', rating: 5, color: '#4a7c59' },
  { id: 8, title: 'Immunity', artist: 'Clairo', rating: 4, color: '#c2a8d0' },
];

// --- Album Card Component ---------------------------------------------
function AlbumCard({ album }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="album-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="album-art"
        style={{
          background: `linear-gradient(135deg, ${album.color}cc, ${album.color}66)`,
        }}
      >
        {/* vinyl disc */}
        <div
          className="album-vinyl"
          style={{ borderColor: album.color }}
        ></div>
        {hovered && (
          <div className="album-overlay">
          </div>
        )}
      </div>
      <div className="album-info">
        <div className="album-artist">{album.artist}</div>
        
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

// --- Main Homepage ----------------------------------------------------
export default function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(RECENT.length / PAGE_SIZE);
  const paginatedAlbums = RECENT.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="homepage">
      {/* Top bar */}
      <div className="topbar">
        <div>
          <div className="greeting">Hi There, LetsTalkMusic! </div>
        </div>
        <div className="avatar">J</div>
      </div>

      {/* Main content – Recently Logged */}
      <div className="main-content">
        <div className="section-header">
          <div className="section-title">Explore these Artists!</div>
          <button className="see-all-btn">See all</button>
        </div>
        <div className="grid">
          {paginatedAlbums.map((album) => (
            <div key={album.id} className="grid-item">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#8a8a8a',
                borderColor: '#2a2a2a',
              },
              '& .MuiPaginationItem-root:hover': {
                borderColor: '#00e544',
                color: '#00e544',
              },
              '& .Mui-selected': {
                backgroundColor: '#00e544 !important',
                color: '#000 !important',
              },
            }}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}
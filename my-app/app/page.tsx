"use client";

import { useState } from "react";
import { fetchData, createAlbum, updateAlbum, deleteAlbum } from "./albums";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    price: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleFetchData() {
    try {
      setLoading(true);
      const data = await fetchData();
      if (data) setAlbums(data);
      setMessage("Albums fetched successfully");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAlbum(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await createAlbum(newAlbum);
      setNewAlbum({ title: "", artist: "", price: 0 });
      setShowCreateForm(false);
      setMessage("Album created successfully");
      
      // Refresh the album list
      handleFetchData();
    } catch (error) {
      setMessage(`Error creating album: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateAlbum(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await updateAlbum(currentAlbum.id, currentAlbum);
      setShowUpdateForm(false);
      setCurrentAlbum(null);
      setMessage("Album updated successfully");
      
      // Refresh the album list
      handleFetchData();
    } catch (error) {
      setMessage(`Error updating album: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAlbum(id) {
    try {
      setLoading(true);
      await deleteAlbum(id);
      
      // Update the local state to remove the deleted album
      setAlbums(albums.filter(album => album.id !== id));
      
      setMessage("Album deleted successfully");
    } catch (error) {
      setMessage(`Error deleting album: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function startUpdateAlbum(album) {
    setCurrentAlbum({...album});
    setShowUpdateForm(true);
  }

  return (
    <div className="container mx-auto p-4">
      <main>
        <h1 className="text-2xl font-bold mb-6 text-center">Album Manager</h1>
        
        {/* Status message */}
        {message && (
          <div className="mb-4 p-2 bg-gray-100 text-center rounded">
            {message}
          </div>
        )}
        
        {/* Fetch button */}
        <div className="flex justify-center mb-6">
          <button 
            className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300" 
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Albums"}
          </button>
          <button 
            className="ml-4 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
            onClick={() => setShowCreateForm(true)}
          >
            Add New Album
          </button>
        </div>
        
        {/* Create Album Form */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Album</h2>
              <form onSubmit={handleCreateAlbum}>
                <div className="mb-4">
                  <label className="block mb-1">Title:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({...newAlbum, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Artist:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={newAlbum.artist}
                    onChange={(e) => setNewAlbum({...newAlbum, artist: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Price:</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={newAlbum.price}
                    onChange={(e) => setNewAlbum({...newAlbum, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    className="px-4 py-2 border rounded"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Album"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Update Album Form */}
        {showUpdateForm && currentAlbum && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Album</h2>
              <form onSubmit={handleUpdateAlbum}>
              <div className="mb-4">
                  <label className="block mb-1">Enter an ID:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={currentAlbum.id}
                    onChange={(e) => setCurrentAlbum({...currentAlbum, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Title:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={currentAlbum.title}
                    onChange={(e) => setCurrentAlbum({...currentAlbum, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Artist:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={currentAlbum.artist}
                    onChange={(e) => setCurrentAlbum({...currentAlbum, artist: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Price:</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={currentAlbum.price}
                    onChange={(e) => setCurrentAlbum({...currentAlbum, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    className="px-4 py-2 border rounded"
                    onClick={() => setShowUpdateForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Album"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Album List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Albums</h2>
          <p className="p-4 text-center text-gray-500">NOTE: If you add an album, you cannot delete or update it yet...</p>
          {albums.length === 0 ? (
            <p className="text-center text-gray-500">No albums to display. Click "Fetch Albums" to load data.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <div key={album.id} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-lg">{album.title}</h3>
                  <p className="text-gray-600">by {album.artist}</p>
                  <p className="text-green-600 font-semibold">${parseFloat(album.price).toFixed(2)}</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button 
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      onClick={() => startUpdateAlbum(album)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      onClick={() => handleDeleteAlbum(album.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
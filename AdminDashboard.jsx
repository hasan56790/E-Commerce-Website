import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, LogOut, Users, ShoppingBag, DollarSign } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    lastingTime: '',
    fragranceNotes: { top: [], heart: [], base: [] },
    image: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product added successfully');
      setIsAddingProduct(false);
      setFormData({
        name: '', description: '', price: '', category: '', stock: '', lastingTime: '',
        fragranceNotes: { top: [], heart: [], base: [] }, image: ''
      });
      fetchProducts();
    } catch (error) {
      toast.error('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="glass-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="AL NASR" className="h-12 w-auto" />
              <div>
                <h1 className="text-3xl font-serif gold-text">Admin Dashboard</h1>
                <p className="text-white/60">Manage your royal fragrance empire</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Products</p>
                <p className="text-3xl font-serif gold-text">{products.length}</p>
              </div>
              <Package size={40} className="text-gold-500/50" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Orders</p>
                <p className="text-3xl font-serif gold-text">{orders.length}</p>
              </div>
              <ShoppingBag size={40} className="text-gold-500/50" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Revenue</p>
                <p className="text-3xl font-serif gold-text">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign size={40} className="text-gold-500/50" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Customers</p>
                <p className="text-3xl font-serif gold-text">{new Set(orders.map(o => o.phone)).size}</p>
              </div>
              <Users size={40} className="text-gold-500/50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gold-500/20">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-serif transition-colors ${
              activeTab === 'products' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-white/60 hover:text-white'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-serif transition-colors ${
              activeTab === 'orders' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-white/60 hover:text-white'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif gold-text">Product Management</h2>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center space-x-2 premium-button px-6 py-2"
              >
                <Plus size={18} />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {isAddingProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              >
                <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-serif gold-text mb-6">Add New Attar</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                      rows="3"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Price (₹)"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Lasting Time (e.g., 8-10 hours)"
                        value={formData.lastingTime}
                        onChange={(e) => setFormData({ ...formData, lastingTime: e.target.value })}
                        className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                        required
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-2 text-white"
                      required
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="premium-button px-6 py-2"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="glass-card overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                    <p className="text-gold-500 text-xl font-bold mb-2">₹{product.price}</p>
                    <p className="text-white/60 text-sm mb-4">Stock: {product.stock}</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData(product);
                        }}
                        className="flex-1 bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <Edit size={16} className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="flex-1 bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-serif gold-text mb-6">Order Management</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gold-500 font-semibold">Order ID: {order.orderId}</p>
                      <p className="text-white/60">Customer: {order.customerName}</p>
                      <p className="text-white/60">Phone: {order.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif gold-text">₹{order.total}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        order.paymentStatus === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gold-500/20 pt-4">
                    <p className="text-white/80 mb-2">Products:</p>
                    {order.products.map((item, idx) => (
                      <p key={idx} className="text-white/60 text-sm">
                        {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
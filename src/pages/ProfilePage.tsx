import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Link as LinkIcon, Twitter, Instagram } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { UserType } from '../types/user';
import ArtistDashboard from '../components/Profile/ArtistDashboard';
import ContentCreatorDashboard from '../components/Profile/ContentCreatorDashboard';
import InvestorDashboard from '../components/Profile/InvestorDashboard';

function ProfilePage() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    usertype: '' as UserType | '',
    bio: '',
    website: '',
    twitter: '',
    instagram: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        usertype: profile.usertype || '',
        bio: profile.bio || '',
        website: profile.website || '',
        twitter: profile.twitter || '',
        instagram: profile.instagram || ''
      });
    }
  }, [profile]);

  const userTypes: { value: UserType; label: string }[] = [
    { value: 'artist', label: 'Artist' },
    { value: 'collector', label: 'Collector' },
    { value: 'fan', label: 'Fan' },
    { value: 'content-creator', label: 'Content Creator' },
    { value: 'investor', label: 'Investor' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const success = await updateProfile({
        name: formData.name,
        usertype: formData.usertype as UserType,
        bio: formData.bio,
        website: formData.website,
        twitter: formData.twitter,
        instagram: formData.instagram
      });

      if (success) {
        setSuccessMessage(
          formData.usertype === 'artist' 
            ? 'Artist profile created successfully! You can now start uploading your music.'
            : 'Profile updated successfully!'
        );
        
        // Clear message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderDashboard = () => {
    switch (formData.usertype) {
      case 'artist':
        return <ArtistDashboard />;
      case 'content-creator':
        return <ContentCreatorDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl overflow-hidden border border-accent/20">
        {/* Profile Header */}
        <div className="relative h-32 bg-surface border-b border-accent/20">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full bg-surface border border-accent/20 flex items-center justify-center">
              <User className="w-12 h-12 text-primary/60" />
            </div>
          </div>
        </div>

        <div className="pt-16 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-primary/60">
                Email
              </label>
              <p className="mt-1 text-primary">{user.email}</p>
            </div>

            {/* User Type */}
            <div>
              <label className="block text-sm text-primary/60 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {userTypes.map(type => (
                  <label
                    key={type.value}
                    className={`
                      flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer
                      transition-colors text-sm
                      ${formData.usertype === type.value
                        ? 'bg-accent/20 text-white border-accent shadow-lg font-medium'
                        : 'border-accent/20 text-primary hover:text-accent'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.usertype === type.value}
                      onChange={(e) => setFormData({ ...formData, usertype: e.target.value as UserType })}
                      className="sr-only"                      
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-primary/60 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={50}
                required
                placeholder="Enter your full name"
                className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm placeholder-primary/50"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-primary/60 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm placeholder-primary/50 disabled:opacity-50"
                placeholder="Tell us about yourself..."                
              />
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-sm text-primary/60">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary/60" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="Your website"
                    className="flex-1 px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm placeholder-primary/50"                    
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-5 h-5 text-primary/60" />
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="Twitter username"
                    className="flex-1 px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm placeholder-primary/50" />
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-primary/60" />
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="Instagram username"
                    className="flex-1 px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm placeholder-primary/50" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                {successMessage && (
                  <span className="text-sm text-accent animate-fade-in">
                    {successMessage}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors disabled:opacity-50 text-sm"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* User Type Specific Dashboard */}
      {formData.usertype && renderDashboard()}
    </div>
  );
}

export default ProfilePage;
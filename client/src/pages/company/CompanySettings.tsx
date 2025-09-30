import { useState } from 'react'
import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Upload,
  X,
  ChevronDown,
  Image,
  Smile,
  Bold,
  Italic,
  List,
  Link
} from 'lucide-react'

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'social-links' | 'team'>('overview')
  const [companyName, setCompanyName] = useState('Spotify')
  const [website, setWebsite] = useState('https://spotify.com')
  const [employee, setEmployee] = useState('4000+')
  const [industry, setIndustry] = useState('Social & Non-Profit')
  const [dateFounded, setDateFounded] = useState('July 31, 2011')
  const [description, setDescription] = useState('Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales.')
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: ''
  })

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  const renderOverviewTab = () => (
    <div className="space-y-7">
      {/* Basic Information */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">Basic Information</h2>
        <p className="text-sm text-gray-600">This is company information that you can update anytime.</p>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Company Logo */}
      <div className="flex gap-7">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Company Logo</h3>
          <p className="text-sm text-gray-600">This image will be shown publicly as company logo.</p>
        </div>
        <div className="flex gap-7">
          {/* Current Logo */}
          <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center">
            <div className="text-white text-3xl font-bold">♫</div>
          </div>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-purple-500 rounded-lg p-5 flex flex-col items-center gap-2 min-w-[280px]">
            <Image className="h-8 w-8 text-purple-500" />
            <div className="text-center">
              <p className="text-gray-900 font-medium">Click to replace or drag and drop</p>
              <p className="text-gray-600 text-sm">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Company Details */}
      <div className="flex gap-7">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Company Details</h3>
          <p className="text-sm text-gray-600">Introduce your company core info quickly to users by fill up company details</p>
        </div>
        
        <div className="w-[510px] space-y-5">
          {/* Company Name */}
          <div className="space-y-1">
            <Label htmlFor="company-name" className="text-gray-800 font-semibold">Company Name</Label>
            <Input 
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="This is placeholder"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* Website */}
          <div className="space-y-1">
            <Label htmlFor="website" className="text-gray-800 font-semibold">Website</Label>
            <Input 
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="This is placeholder"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label className="text-gray-800 font-semibold">Location</Label>
            <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  England
                  <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  Japan
                  <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  Australia
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-900" />
            </div>
          </div>

          {/* Employee and Industry */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1">
              <Label htmlFor="employee" className="text-gray-800 font-semibold">Employee</Label>
              <Input 
                id="employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                placeholder="This is placeholder"
                className="border-gray-200 rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="industry" className="text-gray-800 font-semibold">Industry</Label>
              <Input 
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="This is placeholder"
                className="border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Date Founded */}
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-1">
              <Label className="text-gray-800 font-semibold">Date Founded</Label>
              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-800">July</span>
                <ChevronDown className="h-5 w-5 text-gray-900" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-gray-800 font-semibold">Year</Label>
              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-800">2021</span>
                <ChevronDown className="h-5 w-5 text-gray-900" />
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-1">
            <Label className="text-gray-800 font-semibold">Tech Stack</Label>
            <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  HTML 5
                  <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  CSS 3
                  <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-600 px-3 py-1">
                  Javascript
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* About Company */}
      <div className="flex gap-7">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">About Company</h3>
          <p className="text-sm text-gray-600">Brief description for your company. URLs are hyperlinked.</p>
        </div>
        
        <div className="w-[510px] space-y-1">
          <Label htmlFor="description" className="text-gray-800 font-semibold">Description</Label>
          <div className="border border-gray-200 rounded-t-lg">
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description"
              className="border-0 rounded-t-lg resize-none"
              rows={5}
            />
          </div>
          <div className="border border-t-0 border-gray-200 rounded-b-lg p-3 flex items-center justify-between">
            <div className="flex gap-3">
              <Smile className="h-5 w-5 text-gray-600" />
              <Bold className="h-5 w-5 text-gray-600" />
              <Italic className="h-5 w-5 text-gray-600" />
              <List className="h-5 w-5 text-gray-600" />
              <List className="h-5 w-5 text-gray-600" />
              <Link className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Maximum 500 characters</span>
            <span className="text-gray-800">{description.length} / 500</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSocialLinksTab = () => (
    <div className="space-y-7">
      {/* Basic Information */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">Basic Information</h2>
        <p className="text-sm text-gray-600">Add elsewhere links to your company profile. You can add only username without full https links.</p>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Social Links */}
      <div className="flex gap-7">
        <div className="flex-1"></div>
        <div className="w-[510px] space-y-5">
          {/* Instagram */}
          <div className="space-y-1">
            <Label htmlFor="instagram" className="text-gray-800 font-semibold">Instagram</Label>
            <Input 
              id="instagram"
              value={socialLinks.instagram}
              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
              placeholder="This is placeholder"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* Twitter */}
          <div className="space-y-1">
            <Label htmlFor="twitter" className="text-gray-800 font-semibold">Twitter</Label>
            <Input 
              id="twitter"
              value={socialLinks.twitter}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              placeholder="This is placeholder"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* Facebook */}
          <div className="space-y-1">
            <Label htmlFor="facebook" className="text-gray-800 font-semibold">Facebook</Label>
            <Input 
              id="facebook"
              value={socialLinks.facebook}
              onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
              placeholder="This is placeholder"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <Label htmlFor="linkedin" className="text-gray-800 font-semibold">LinkedIn</Label>
            <Input 
              id="linkedin"
              value={socialLinks.linkedin}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              placeholder="Enter your LinkedIn address"
              className="border-gray-200 rounded-lg"
            />
          </div>

          {/* YouTube */}
          <div className="space-y-1">
            <Label htmlFor="youtube" className="text-gray-800 font-semibold">Youtube</Label>
            <Input 
              id="youtube"
              value={socialLinks.youtube}
              onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
              placeholder="Enter your youtube address"
              className="border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTeamTab = () => (
    <div className="space-y-7">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">Team Management</h2>
        <p className="text-sm text-gray-600">Manage your team members and their roles.</p>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="text-center py-10">
        <p className="text-sm text-gray-600">Team management features coming soon...</p>
      </div>
    </div>
  )

  return (
    <CompanyLayout>
      <div className="flex-1 overflow-auto bg-white">
        {/* Header */}
        <div className="px-5 py-5">
          <h1 className="text-2xl font-semibold text-gray-900 mb-5">Settings</h1>
          
          {/* Tabs */}
          <div className="flex gap-9 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-semibold ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-gray-900'
                  : 'border-transparent text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('social-links')}
              className={`pb-4 px-1 border-b-2 font-semibold ${
                activeTab === 'social-links'
                  ? 'border-purple-500 text-gray-900'
                  : 'border-transparent text-gray-600'
              }`}
            >
              Social Links
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`pb-4 px-1 border-b-2 font-semibold ${
                activeTab === 'team'
                  ? 'border-purple-500 text-gray-900'
                  : 'border-transparent text-gray-600'
              }`}
            >
              Team
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-7">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'social-links' && renderSocialLinksTab()}
          {activeTab === 'team' && renderTeamTab()}
        </div>

        {/* Save Button */}
        <div className="px-7 pb-7">
          <div className="border-t border-gray-200 pt-5">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-2 text-base font-semibold">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}

export default CompanySettings


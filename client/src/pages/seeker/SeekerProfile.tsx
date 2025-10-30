import { useState } from 'react';
import { MapPin, Pencil, Plus, Globe, Mail, Phone, Flag } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import FormDialog from '../../components/common/FormDialog';
import { ImageCropper } from '../../components/common/ImageCropper';
import type { Area } from 'react-easy-crop';

export function SeekerProfile() {
  // Dialog states
  const [editBannerOpen, setEditBannerOpen] = useState(false);
  const [bannerCropperOpen, setBannerCropperOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileCropperOpen, setProfileCropperOpen] = useState(false);
  const [editAboutOpen, setEditAboutOpen] = useState(false);
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [editExperienceOpen, setEditExperienceOpen] = useState(false);
  const [addEducationOpen, setAddEducationOpen] = useState(false);
  const [editEducationOpen, setEditEducationOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);
  const [editSocialOpen, setEditSocialOpen] = useState(false);

  // Temporary images for cropping
  const [tempBannerImage, setTempBannerImage] = useState<string>('');
  const [tempProfileImage, setTempProfileImage] = useState<string>('');

  // Form states
  const [bannerImage, setBannerImage] = useState<string>(
    'https://rerouting.ca/wp-content/uploads/2020/12/2.png'
  );
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  
  const [profilePhoto, setProfilePhoto] = useState<string>(
    'https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-103130.jpg'
  );
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  
  const [profileData, setProfileData] = useState({
    name: 'Jake Gyll',
    position: 'Product Designer',
    company: 'Twitter',
    location: 'Manchester, UK',
    openForOpportunities: true,
  });

  const [aboutData, setAboutData] = useState(
    "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups."
  );

  const [experienceData, setExperienceData] = useState({
    title: '',
    company: '',
    type: 'Full-Time',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  });

  const [educationData, setEducationData] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    email: 'jakegyll@email.com',
    phone: '+44 1245 572 135',
    languages: 'English, French',
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: 'instagram.com/jakegyll',
    twitter: 'twitter.com/jakegyll',
    website: 'www.jakegyll.com',
  });

  const [newSkill, setNewSkill] = useState('');

  const experiences = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Twitter',
      type: 'Full-Time',
      period: 'Jun 2019 - Present (1y 1m)',
      location: 'Manchester, UK',
      description:
        'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.',
    },
    {
      id: 2,
      title: 'Growth Marketing Designer',
      company: 'GoDaddy',
      type: 'Full-Time',
      period: 'Jun 2011 - May 2019 (8y)',
      location: 'Manchester, UK',
      description:
        'Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives',
    },
  ];

  const education = [
    {
      id: 1,
      school: 'Harvard University',
      degree: 'Postgraduate degree, Applied Psychology',
      period: '2010 - 2012',
      description:
        'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.',
    },
    {
      id: 2,
      school: 'University of Toronto',
      degree: 'Bachelor of Arts, Visual Communication',
      period: '2005 - 2009',
    },
  ];

  const skills = ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager'];

  // Handlers
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setTempBannerImage(imageUrl);
        setEditBannerOpen(false); // Close banner dialog
        setBannerCropperOpen(true); // Open cropper
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerCropComplete = async (_croppedAreaPixels: Area, croppedImage: string) => {
    setBannerImage(croppedImage);
    setBannerImageFile(null); // Reset file since we're using cropped image
    setBannerCropperOpen(false);
  };

  const handleEditBanner = () => {
    console.log('Banner Updated:', {
      bannerImageUrl: bannerImage,
    });
    setEditBannerOpen(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setTempProfileImage(imageUrl);
        setEditProfileOpen(false); // Close profile dialog
        setProfileCropperOpen(true); // Open cropper
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileCropComplete = async (_croppedAreaPixels: Area, croppedImage: string) => {
    setProfilePhoto(croppedImage);
    setProfilePhotoFile(null); // Reset file since we're using cropped image
    setProfileCropperOpen(false);
  };

  const handleEditProfile = () => {
    console.log('Profile Updated:', {
      ...profileData,
      profilePhoto: profilePhotoFile ? profilePhotoFile.name : 'No file selected',
      profilePhotoUrl: profilePhoto,
    });
    setEditProfileOpen(false);
  };

  const handleEditAbout = () => {
    console.log('About Me Updated:', aboutData);
    setEditAboutOpen(false);
  };

  const handleAddExperience = () => {
    console.log('New Experience Added:', experienceData);
    setAddExperienceOpen(false);
    setExperienceData({
      title: '',
      company: '',
      type: 'Full-Time',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    });
  };

  const handleEditExperience = (exp: typeof experiences[0]) => {
    console.log('Experience Updated:', { id: exp.id, ...experienceData });
    setEditExperienceOpen(false);
  };

  const handleAddEducation = () => {
    console.log('New Education Added:', educationData);
    setAddEducationOpen(false);
    setEducationData({
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleEditEducation = (edu: typeof education[0]) => {
    console.log('Education Updated:', { id: edu.id, ...educationData });
    setEditEducationOpen(false);
  };

  const handleAddSkill = () => {
    console.log('New Skill Added:', newSkill);
    setAddSkillOpen(false);
    setNewSkill('');
  };

  const handleEditDetails = () => {
    console.log('Additional Details Updated:', additionalDetails);
    setEditDetailsOpen(false);
  };

  const handleEditSocial = () => {
    console.log('Social Links Updated:', socialLinks);
    setEditSocialOpen(false);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Profile Header */}
          <Card className="!py-0 border border-[#d6ddeb] overflow-hidden">
            <div className="h-[140px] relative overflow-hidden">
              <img 
                src={bannerImage} 
                alt="Profile Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="absolute top-5 right-5 h-8 w-8 bg-white/20 border-white/30 text-white hover:bg-white/80 hover:text-black backdrop-blur-sm !rounded-full"
                onClick={() => setEditBannerOpen(true)}
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            <div className="px-5 pb-5 relative">
              <div className="flex items-end gap-5 -mt-25 mb-3">
                <div className="w-[112px] h-[112px] rounded-full border-[3px] border-white bg-gradient-to-br from-[#26a4ff] to-[#4640de] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                    <img src={profilePhoto} alt="Profile Photo" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-[19px] text-[#25324b] font-extrabold leading-[1.2]">
                    Jake Gyll
                  </h2>
                  <p className="text-[14px] text-[#7c8493]">
                    Product Designer at <span className="font-medium text-[#25324b]">Twitter</span>
                  </p>
                  <div className="flex items-center gap-2 font-medium text-[#7c8493]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[14px]">Manchester, UK</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[rgba(86,205,173,0.1)] px-5 py-2 rounded-lg mt-2">
                    <Flag className="w-5 h-5 text-[#56cdad]" />
                    <span className="font-semibold text-[13px] text-[#56cdad]">
                      OPEN FOR OPPORTUNITIES
                    </span>
                  </div>
                </div>
                <Button 
                  variant="seekerOutline" 
                  className="border-[#ccccf5] text-[#4640de] text-[13px] px-4 py-2"
                  onClick={() => setEditProfileOpen(true)}
                >  
                  <Pencil className="w-3 h-3 mr-2" />
                  <p className="text-[13px] font-bold">
                    Edit Profile
                  </p>
                </Button>
              </div>
            </div>
          </Card>

          {/* About Me */}
          <Card className="p-5 !gap-0 border border-[#d6ddeb]">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[16px] text-[#25324b]">
                About Me
              </p>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="h-8 w-8 !rounded-full"
                onClick={() => setEditAboutOpen(true)}
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3 text-[#515b6f] text-[13px] leading-[1.6]">
              <p>
                I'm a product designer + filmmaker currently working remotely at Twitter from beautiful
                Manchester, United Kingdom. I'm passionate about designing digital products that have a
                positive impact on the world.
              </p>
              <p>
                For 10 years, I've specialised in interface, experience & interaction design as well as
                working in user research and product strategy for product agencies, big tech companies &
                start-ups.
              </p>
            </div>
          </Card>

          {/* Experience */}
          <Card className="!gap-0 !p-0 border border-[#d6ddeb]">
            <div className="p-5 flex items-center justify-between border-b border-[#d6ddeb]">
              <p className="font-bold text-[16px] text-[#25324b]">
                Experiences
              </p>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="h-8 w-8 !rounded-full"
                onClick={() => setAddExperienceOpen(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="divide-y divide-[#d6ddeb]">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 flex gap-5">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {exp.company[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[14px] text-[#25324b] mb-1">
                          {exp.title}
                        </p>
                        <div className="flex items-center gap-2 text-[13px] text-[#7c8493] mb-1">
                          <span className="font-medium text-[#25324b]">
                            {exp.company}
                          </span>
                          <span>•</span>
                          <span>{exp.type}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                        </div>
                        <p className="text-[13px] text-[#7c8493]">
                          {exp.location}
                        </p>
                      </div>
                      <Button 
                        variant="seekerOutline" 
                        size="sm" 
                        className="h-8 w-8 !rounded-full"
                        onClick={() => {
                          setExperienceData({
                            title: exp.title,
                            company: exp.company,
                            type: exp.type,
                            startDate: '',
                            endDate: '',
                            location: exp.location,
                            description: exp.description,
                          });
                          setEditExperienceOpen(true);
                        }}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-[13px] text-[#25324b] mt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 flex justify-center">
              <Button variant="seekerOutline" size="sm" className="text-[13px] font-bold">
                Show 3 more experiences
              </Button>
            </div>
          </Card>

          {/* Education */}
          <Card className="!gap-0 !p-0 border border-[#d6ddeb]">
            <div className="p-5 flex items-center justify-between border-b border-[#d6ddeb]">
              <p className="font-bold text-[16px] text-[#25324b]">
                Educations
              </p>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="h-8 w-8 !rounded-full"
                onClick={() => setAddEducationOpen(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="divide-y divide-[#d6ddeb]">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 flex gap-5">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {edu.school[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[14px] text-[#25324b] mb-1">
                          {edu.school}
                        </p>
                        <p className="text-[13px] font-medium text-[#7c8493] mb-1">
                          {edu.degree}
                        </p>
                        <p className="text-[13px] text-[#7c8493]">
                          {edu.period}
                        </p>
                      </div>
                      <Button 
                        variant="seekerOutline" 
                        size="sm" 
                        className="h-8 w-8 !rounded-full"
                        onClick={() => {
                          setEducationData({
                            school: edu.school,
                            degree: edu.degree,
                            startDate: '',
                            endDate: '',
                            description: edu.description || '',
                          });
                          setEditEducationOpen(true);
                        }}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                    {edu.description && (
                      <p className="text-[13px] text-[#25324b] mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 flex justify-center">
              <Button variant="seekerOutline" size="sm" className="text-[13px] font-bold">
                Show 2 more educations
              </Button>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-5 !gap-0 border border-[#d6ddeb]">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[16px] text-[#25324b]">Skills</p>
              <div className="flex gap-2">
                <Button 
                  variant="seekerOutline" 
                  size="sm" 
                  className="h-8 w-8 !rounded-full"
                  onClick={() => setAddSkillOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="skill"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Additional Details */}
          <Card className="p-5 !gap-0 border border-[#d6ddeb]">
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-[16px] text-[#25324b]">
                Additional Details
              </p>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="h-8 w-8 !rounded-full"
                onClick={() => setEditDetailsOpen(true)}
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-[#7c8493] mb-1">Email</p>
                  <p className="text-[13px] font-medium text-[#25324b]">
                    jakegyll@email.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-[#7c8493] mb-1">Phone</p>
                  <p className="text-[13px] font-medium text-[#25324b]">
                    +44 1245 572 135
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-[#7c8493] mb-1">
                    Languages
                  </p>
                  <p className="text-[13px] font-medium text-[#25324b]">
                    English, French
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card className="p-5 !gap-0 border border-[#d6ddeb]">
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-[16px] text-[#25324b]">
                Social Links
              </p>
              <Button 
                variant="seekerOutline" 
                size="sm" 
                className="h-8 w-8 !rounded-full"
                onClick={() => setEditSocialOpen(true)}
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#7c8493] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12C22 6.48 17.52 2 12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#7c8493] mb-1">
                    Instagram
                  </p>
                  <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">
                    instagram.com/jakegyll
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#7c8493] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.70 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] text-[#7c8493] font-medium mb-1">Twitter</p>
                  <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">
                    twitter.com/jakegyll
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                <div>
                  <p className="text-[13px] text-[#7c8493] font-medium mb-1">Website</p>
                  <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">
                    www.jakegyll.com
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Banner Dialog */}
      <FormDialog
        open={editBannerOpen}
        onOpenChange={setEditBannerOpen}
        title="Change Banner"
        onSubmit={handleEditBanner}
        maxWidth="2xl"
      >
        {/* Banner Upload Section */}
        <div className="flex flex-col items-center gap-4 pb-4 border-b border-[#e5e7eb]">
          <div className="w-full max-w-md">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-[#e5e7eb] bg-gradient-to-br from-[#f8f9ff] to-[#e5e7eb]">
              <img 
                src={bannerImage} 
                alt="Banner Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="mt-4 text-center">
              <Label htmlFor="banner-upload" className="cursor-pointer">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4640de] text-white rounded-lg hover:bg-[#3b37c7] transition-colors">
                  <Pencil className="w-4 h-4" />
                  <span className="text-[14px] font-bold">Upload New Banner</span>
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerChange}
                />
              </Label>
              <p className="text-[12px] text-[#6b7280] mt-2">
                {bannerImageFile ? bannerImageFile.name : 'Recommended size: 1200x300px'}
              </p>
            </div>
          </div>
        </div>
      </FormDialog>

      {/* Edit Profile Dialog */}
      <FormDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        title="Edit Profile"
        fields={[
          {
            id: 'name',
            label: 'Full Name',
            value: profileData.name,
            onChange: (value) => setProfileData({ ...profileData, name: value }),
          },
          {
            id: 'position',
            label: 'Position',
            value: profileData.position,
            onChange: (value) => setProfileData({ ...profileData, position: value }),
          },
          {
            id: 'company',
            label: 'Company',
            value: profileData.company,
            onChange: (value) => setProfileData({ ...profileData, company: value }),
          },
          {
            id: 'location',
            label: 'Location',
            value: profileData.location,
            onChange: (value) => setProfileData({ ...profileData, location: value }),
          },
        ]}
        onSubmit={handleEditProfile}
        maxWidth="2xl"
      >
        {/* Profile Photo Upload Section */}
        <div className="flex flex-col items-center gap-4 pb-4 border-b border-[#e5e7eb]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-[#26a4ff] to-[#4640de] overflow-hidden shadow-lg">
              <img 
                src={profilePhoto} 
                alt="Profile Photo" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <label
              htmlFor="profile-photo-upload"
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#4640de] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3b37c7] transition-colors shadow-md"
            >
              <Pencil className="w-4 h-4 text-white" />
              <input
                id="profile-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-medium text-[#25324b] mb-1">Profile Photo</p>
            <p className="text-[12px] text-[#6b7280]">
              {profilePhotoFile ? profilePhotoFile.name : 'Click the icon to upload a new photo'}
            </p>
          </div>
        </div>
      </FormDialog>

      {/* Edit About Me Dialog */}
      <FormDialog
        open={editAboutOpen}
        onOpenChange={setEditAboutOpen}
        title="Edit About Me"
        fields={[
          {
            id: 'about',
            label: 'About Me',
            type: 'textarea',
            rows: 6,
            value: aboutData,
            onChange: (value) => setAboutData(value),
          },
        ]}
        onSubmit={handleEditAbout}
        maxWidth="2xl"
      />

      {/* Add Experience Dialog */}
      <FormDialog
        open={addExperienceOpen}
        onOpenChange={setAddExperienceOpen}
        title="Add Experience"
        fields={[
          {
            id: 'exp-title',
            label: 'Job Title',
            value: experienceData.title,
            onChange: (value) => setExperienceData({ ...experienceData, title: value }),
          },
          {
            id: 'exp-company',
            label: 'Company',
            value: experienceData.company,
            onChange: (value) => setExperienceData({ ...experienceData, company: value }),
          },
          {
            id: 'exp-description',
            label: 'Description',
            type: 'textarea',
            rows: 4,
            value: experienceData.description,
            onChange: (value) => setExperienceData({ ...experienceData, description: value }),
          },
        ]}
        fieldGroups={[
          {
            fields: [
              {
                id: 'exp-type',
                label: 'Employment Type',
                value: experienceData.type,
                onChange: (value) => setExperienceData({ ...experienceData, type: value }),
              },
              {
                id: 'exp-location',
                label: 'Location',
                value: experienceData.location,
                onChange: (value) => setExperienceData({ ...experienceData, location: value }),
              },
            ],
            gridCols: 2,
          },
          {
            fields: [
              {
                id: 'exp-start',
                label: 'Start Date',
                type: 'date',
                value: experienceData.startDate,
                onChange: (value) => setExperienceData({ ...experienceData, startDate: value }),
              },
              {
                id: 'exp-end',
                label: 'End Date',
                type: 'date',
                value: experienceData.endDate,
                onChange: (value) => setExperienceData({ ...experienceData, endDate: value }),
              },
            ],
            gridCols: 2,
          },
        ]}
        onSubmit={handleAddExperience}
        submitLabel="Add Experience"
        maxWidth="2xl"
      />

      {/* Edit Experience Dialog */}
      <FormDialog
        open={editExperienceOpen}
        onOpenChange={setEditExperienceOpen}
        title="Edit Experience"
        fields={[
          {
            id: 'edit-exp-title',
            label: 'Job Title',
            value: experienceData.title,
            onChange: (value) => setExperienceData({ ...experienceData, title: value }),
          },
          {
            id: 'edit-exp-company',
            label: 'Company',
            value: experienceData.company,
            onChange: (value) => setExperienceData({ ...experienceData, company: value }),
          },
          {
            id: 'edit-exp-description',
            label: 'Description',
            type: 'textarea',
            rows: 4,
            value: experienceData.description,
            onChange: (value) => setExperienceData({ ...experienceData, description: value }),
          },
        ]}
        fieldGroups={[
          {
            fields: [
              {
                id: 'edit-exp-type',
                label: 'Employment Type',
                value: experienceData.type,
                onChange: (value) => setExperienceData({ ...experienceData, type: value }),
              },
              {
                id: 'edit-exp-location',
                label: 'Location',
                value: experienceData.location,
                onChange: (value) => setExperienceData({ ...experienceData, location: value }),
              },
            ],
            gridCols: 2,
          },
          {
            fields: [
              {
                id: 'edit-exp-start',
                label: 'Start Date',
                type: 'date',
                value: experienceData.startDate,
                onChange: (value) => setExperienceData({ ...experienceData, startDate: value }),
              },
              {
                id: 'edit-exp-end',
                label: 'End Date',
                type: 'date',
                value: experienceData.endDate,
                onChange: (value) => setExperienceData({ ...experienceData, endDate: value }),
              },
            ],
            gridCols: 2,
          },
        ]}
        onSubmit={() => {
          const exp = experiences.find(e => e.title === experienceData.title) || experiences[0];
          handleEditExperience(exp);
        }}
        maxWidth="2xl"
      />

      {/* Add Education Dialog */}
      <FormDialog
        open={addEducationOpen}
        onOpenChange={setAddEducationOpen}
        title="Add Education"
        fields={[
          {
            id: 'edu-school',
            label: 'School/University',
            value: educationData.school,
            onChange: (value) => setEducationData({ ...educationData, school: value }),
          },
          {
            id: 'edu-degree',
            label: 'Degree',
            value: educationData.degree,
            onChange: (value) => setEducationData({ ...educationData, degree: value }),
          },
          {
            id: 'edu-description',
            label: 'Description (Optional)',
            type: 'textarea',
            rows: 4,
            value: educationData.description,
            onChange: (value) => setEducationData({ ...educationData, description: value }),
          },
        ]}
        fieldGroups={[
          {
            fields: [
              {
                id: 'edu-start',
                label: 'Start Date',
                type: 'date',
                value: educationData.startDate,
                onChange: (value) => setEducationData({ ...educationData, startDate: value }),
              },
              {
                id: 'edu-end',
                label: 'End Date',
                type: 'date',
                value: educationData.endDate,
                onChange: (value) => setEducationData({ ...educationData, endDate: value }),
              },
            ],
            gridCols: 2,
          },
        ]}
        onSubmit={handleAddEducation}
        submitLabel="Add Education"
        maxWidth="2xl"
      />

      {/* Edit Education Dialog */}
      <FormDialog
        open={editEducationOpen}
        onOpenChange={setEditEducationOpen}
        title="Edit Education"
        fields={[
          {
            id: 'edit-edu-school',
            label: 'School/University',
            value: educationData.school,
            onChange: (value) => setEducationData({ ...educationData, school: value }),
          },
          {
            id: 'edit-edu-degree',
            label: 'Degree',
            value: educationData.degree,
            onChange: (value) => setEducationData({ ...educationData, degree: value }),
          },
          {
            id: 'edit-edu-description',
            label: 'Description (Optional)',
            type: 'textarea',
            rows: 4,
            value: educationData.description,
            onChange: (value) => setEducationData({ ...educationData, description: value }),
          },
        ]}
        fieldGroups={[
          {
            fields: [
              {
                id: 'edit-edu-start',
                label: 'Start Date',
                type: 'date',
                value: educationData.startDate,
                onChange: (value) => setEducationData({ ...educationData, startDate: value }),
              },
              {
                id: 'edit-edu-end',
                label: 'End Date',
                type: 'date',
                value: educationData.endDate,
                onChange: (value) => setEducationData({ ...educationData, endDate: value }),
              },
            ],
            gridCols: 2,
          },
        ]}
        onSubmit={() => {
          const edu = education.find(e => e.school === educationData.school) || education[0];
          handleEditEducation(edu);
        }}
        maxWidth="2xl"
      />

      {/* Add Skill Dialog */}
      <FormDialog
        open={addSkillOpen}
        onOpenChange={setAddSkillOpen}
        title="Add Skill"
        fields={[
          {
            id: 'skill',
            label: 'Skill Name',
            value: newSkill,
            onChange: (value) => setNewSkill(value),
            placeholder: 'Enter skill name',
          },
        ]}
        onSubmit={handleAddSkill}
        submitLabel="Add Skill"
      />

      {/* Edit Additional Details Dialog */}
      <FormDialog
        open={editDetailsOpen}
        onOpenChange={setEditDetailsOpen}
        title="Edit Additional Details"
        fields={[
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: additionalDetails.email,
            onChange: (value) => setAdditionalDetails({ ...additionalDetails, email: value }),
          },
          {
            id: 'phone',
            label: 'Phone',
            type: 'tel',
            value: additionalDetails.phone,
            onChange: (value) => setAdditionalDetails({ ...additionalDetails, phone: value }),
          },
          {
            id: 'languages',
            label: 'Languages',
            value: additionalDetails.languages,
            onChange: (value) => setAdditionalDetails({ ...additionalDetails, languages: value }),
            placeholder: 'e.g., English, French, Spanish',
          },
        ]}
        onSubmit={handleEditDetails}
      />

      {/* Edit Social Links Dialog */}
      <FormDialog
        open={editSocialOpen}
        onOpenChange={setEditSocialOpen}
        title="Edit Social Links"
        fields={[
          {
            id: 'instagram',
            label: 'Instagram',
            value: socialLinks.instagram,
            onChange: (value) => setSocialLinks({ ...socialLinks, instagram: value }),
            placeholder: 'instagram.com/username',
          },
          {
            id: 'twitter',
            label: 'Twitter',
            value: socialLinks.twitter,
            onChange: (value) => setSocialLinks({ ...socialLinks, twitter: value }),
            placeholder: 'twitter.com/username',
          },
          {
            id: 'website',
            label: 'Website',
            value: socialLinks.website,
            onChange: (value) => setSocialLinks({ ...socialLinks, website: value }),
            placeholder: 'www.example.com',
          },
        ]}
        onSubmit={handleEditSocial}
      />

      {/* Banner Image Cropper */}
      <ImageCropper
        open={bannerCropperOpen}
        onOpenChange={setBannerCropperOpen}
        image={tempBannerImage}
        aspect={4 / 1} // Banner aspect ratio (width/height)
        cropShape="rect"
        onCropComplete={handleBannerCropComplete}
        title="Crop Banner Image"
      />

      {/* Profile Photo Cropper */}
      <ImageCropper
        open={profileCropperOpen}
        onOpenChange={setProfileCropperOpen}
        image={tempProfileImage}
        aspect={1} // Square aspect ratio for profile photo
        cropShape="round"
        onCropComplete={handleProfileCropComplete}
        title="Crop Profile Photo"
      />
    </div>
  );
}

export default SeekerProfile;

import AdminLayout from '../../components/layouts/AdminLayout'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { MapPin, Flag, Plus, Globe, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import FormDialog from '../../components/common/FormDialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const SeekerProfileView = () => {
  
  const profile = {
    name: 'Jake Gyll',
    position: 'Product Designer',
    company: 'Twitter',
    location: 'Manchester, UK',
    openForOpportunities: true,
    bannerImage: 'https://rerouting.ca/wp-content/uploads/2020/12/2.png',
    profilePhoto: 'https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-103130.jpg',
  }

  const aboutText = `I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.

For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.`

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
  ]

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
  ]

  const skills = ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager']

  const additionalDetails = {
    email: 'jakegyll@email.com',
    phone: '+44 1245 572 135',
    languages: 'English, French',
  }

  const social = {
    instagram: 'instagram.com/jakegyll',
    twitter: 'twitter.com/jakegyll',
    website: 'www.jakegyll.com',
  }

  const blockReasons = [
    { value: 'fraudulent', label: 'Submitting fake or misleading profile information' },
    { value: 'violation', label: 'Repeated violation of platform rules or guidelines' },
    { value: 'offensive', label: 'Inappropriate or offensive behavior' },
    { value: 'spam', label: 'Engaging in spam or unsolicited contact' },
    { value: 'abuse', label: 'Suspected scam, abuse, or exploitation' },
    { value: 'other', label: 'Other (please specify)' }
  ];
  const [blockOpen, setBlockOpen] = useState(false)
  const [reasonType, setReasonType] = useState('');
  const [customReason, setCustomReason] = useState('');
  const blockReason = reasonType === 'other'
    ? customReason
    : (blockReasons.find(r => r.value === reasonType)?.label || '');
  const canBlock = reasonType && (reasonType !== 'other' || customReason.trim());
  const [blocked, setBlocked] = useState(false)
  const handleBlock = () => {
    if (!canBlock) return;
    setBlocked(true);
    setBlockOpen(false);
  }

  return (
    <AdminLayout>
      <div className="p-10 max-w-7xl mx-auto">
        <div className="flex justify-end">
          {!blocked && (
            <Button className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200 mr-2 mb-2" onClick={() => setBlockOpen(true)}>
              Block
            </Button>
          )}
        </div>
        {blocked && <div className="text-red-600 font-semibold p-1">Blocked: {blockReason}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className="lg:col-span-2 space-y-5">
            
            <Card className="!py-0 border border-[#d6ddeb] overflow-hidden">
              <div className="h-[140px] relative overflow-hidden">
                <img 
                  src={profile.bannerImage} 
                  alt="Profile Banner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="px-5 pb-5 relative">
                <div className="flex items-end gap-5 -mt-25 mb-3">
                  <div className="w-[112px] h-[112px] rounded-full border-[3px] border-white bg-gradient-to-br from-[#26a4ff] to-[#4640de] overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                      <img src={profile.profilePhoto} alt="Profile Photo" className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-[19px] text-[#25324b] font-extrabold leading-[1.2]">
                      {profile.name}
                    </h2>
                    <p className="text-[14px] text-[#7c8493]">
                      {profile.position} at <span className="font-medium text-[#25324b]">{profile.company}</span>
                    </p>
                    <div className="flex items-center gap-2 font-medium text-[#7c8493]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[14px]">{profile.location}</span>
                    </div>
                    {profile.openForOpportunities && (
                      <div className="inline-flex items-center gap-2 bg-[rgba(86,205,173,0.1)] px-5 py-2 rounded-lg mt-2">
                        <Flag className="w-5 h-5 text-[#56cdad]" />
                        <span className="font-semibold text-[13px] text-[#56cdad]">
                          OPEN FOR OPPORTUNITIES
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 !gap-0 border border-[#d6ddeb]">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-[16px] text-[#25324b]">About Me</p>
              </div>
              <div className="space-y-3 text-[#515b6f] text-[13px] leading-[1.6]">
                {aboutText.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Card>

            <Card className="!gap-0 !p-0 border border-[#d6ddeb]">
              <div className="p-5 flex items-center justify-between border-b border-[#d6ddeb]">
                <p className="font-bold text-[16px] text-[#25324b]">Experiences</p>
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
                          <p className="font-bold text-[14px] text-[#25324b] mb-1">{exp.title}</p>
                          <div className="flex items-center gap-2 text-[13px] text-[#7c8493] mb-1">
                            <span className="font-medium text-[#25324b]">{exp.company}</span>
                            <span>•</span>
                            <span>{exp.type}</span>
                            <span>•</span>
                            <span>{exp.period}</span>
                          </div>
                          <p className="text-[13px] text-[#7c8493]">{exp.location}</p>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#25324b] mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 flex justify-center">
                <Button variant="seekerOutline" size="sm" className="text-[13px] font-bold" disabled>
                  Show 3 more experiences
                </Button>
              </div>
            </Card>

            <Card className="!gap-0 !p-0 border border-[#d6ddeb]">
              <div className="p-5 flex items-center justify-between border-b border-[#d6ddeb]">
                <p className="font-bold text-[16px] text-[#25324b]">Educations</p>
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
                          <p className="font-bold text-[14px] text-[#25324b] mb-1">{edu.school}</p>
                          <p className="text-[13px] font-medium text-[#7c8493] mb-1">{edu.degree}</p>
                          <p className="text-[13px] text-[#7c8493]">{edu.period}</p>
                        </div>
                      </div>
                      {edu.description && (
                        <p className="text-[13px] text-[#25324b] mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 flex justify-center">
                <Button variant="seekerOutline" size="sm" className="text-[13px] font-bold" disabled>
                  Show 2 more educations
                </Button>
              </div>
            </Card>

            <Card className="p-5 !gap-0 border border-[#d6ddeb]">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-[16px] text-[#25324b]">Skills</p>
                <div className="flex gap-2">
                  <Button variant="seekerOutline" size="sm" className="h-8 w-8 !rounded-full" disabled>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="skill">{skill}</Badge>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            
            <Card className="p-5 !gap-0 border border-[#d6ddeb]">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[16px] text-[#25324b]">Additional Details</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#7c8493] mb-1">Email</p>
                    <p className="text-[13px] font-medium text-[#25324b]">{additionalDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#7c8493] mb-1">Phone</p>
                    <p className="text-[13px] font-medium text-[#25324b]">{additionalDetails.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#7c8493] mb-1">Languages</p>
                    <p className="text-[13px] font-medium text-[#25324b]">{additionalDetails.languages}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 !gap-0 border border-[#d6ddeb]">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[16px] text-[#25324b]">Social Links</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-[#7c8493] flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12C22 6.48 17.52 2 12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#7c8493] mb-1">Instagram</p>
                    <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">{social.instagram}</p>
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
                    <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">{social.twitter}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#7c8493] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#7c8493] font-medium mb-1">Website</p>
                    <p className="text-[13px] text-[#4640de] font-medium hover:underline cursor-pointer">{social.website}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <FormDialog
        isOpen={blockOpen}
        onClose={() => setBlockOpen(false)}
        onConfirm={handleBlock}
        title="Block Seeker"
        description="Select a reason for blocking this account."
        confirmText="Block"
        cancelText="Cancel"
        confirmVariant="destructive"
        isLoading={false}
      >
        <div>
          <label className="text-sm font-medium mb-1 block">Reason</label>
          <Select value={reasonType} onValueChange={setReasonType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reason..." />
            </SelectTrigger>
            <SelectContent>
              {blockReasons.map(reason => (
                <SelectItem value={reason.value} key={reason.value}>{reason.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {reasonType === 'other' && (
            <textarea
              className="mt-2 w-full border rounded p-2 text-sm min-h-[90px]"
              value={customReason}
              onChange={e => setCustomReason(e.target.value)}
              required
              placeholder="Describe the reason for blocking..."
            />
          )}
        </div>
      </FormDialog>
    </AdminLayout>
  )
}

export default SeekerProfileView
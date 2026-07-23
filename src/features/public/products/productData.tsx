import React from 'react'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import ComputerIcon from '@mui/icons-material/Computer'
import MemoryIcon from '@mui/icons-material/Memory'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import StorageIcon from '@mui/icons-material/Storage'
import RouterIcon from '@mui/icons-material/Router'
import SmartphoneIcon from '@mui/icons-material/Smartphone'

export interface TabContent {
  description: string
  specifications: string[]
  applications: string[]
  downloads: { label: string; url?: string }[]
}

export interface Product {
  id: number
  icon: React.ReactNode
  name: string
  description: string
  price: string
  category: string
  brand: string
  images: string[]
  keyFeatures: string[]
  tabContent: TabContent
}

export const products: Product[] = [
  {
    id: 1,
    icon: <DevicesOtherIcon sx={{ fontSize: 56 }} />,
    name: 'Enterprise Server',
    description: 'High-performance server for large-scale operations.',
    price: '$12,499',
    category: 'Hardware',
    brand: 'Dell',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Enterprise+Server',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Server+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=Server+Back',
      'https://placehold.co/600x500/475569/FFFFFF?text=Server+Ports',
      'https://placehold.co/600x500/64748B/FFFFFF?text=Server+Rack',
      'https://placehold.co/600x500/0F172A/FFFFFF?text=Server+Detail',
    ],
    keyFeatures: [
      'Dual Intel Xeon Scalable processors',
      '128GB DDR5 ECC memory',
      '4x 2TB NVMe SSD hot-swap bays',
      'Dual 10GbE network ports',
      'Redundant power supplies',
      'iDRAC9 remote management',
    ],
    tabContent: {
      description: 'The Dell Enterprise Server is designed to meet the demanding needs of modern enterprises. Built with cutting-edge technology and rigorously tested for reliability, it delivers exceptional performance in even the most challenging environments. Whether deployed in a data center, office, or remote location, this server ensures seamless integration with existing infrastructure and provides the scalability required for future growth.',
      specifications: [
        'Form Factor: 2U rack-mountable',
        'Processor: Dual Intel Xeon Scalable (up to 32 cores each)',
        'Memory: 128GB DDR5 ECC (expandable to 4TB)',
        'Storage: 4x 2TB NVMe SSD hot-swap bays',
        'Networking: Dual 10GbE + dedicated management port',
        'Power: Dual redundant 1600W PSUs',
        'Management: iDRAC9 with Lifecycle Controller',
        'Warranty: 3-year limited hardware warranty',
        'Certification: ISO 9001, CE, RoHS compliant',
      ],
      applications: [
        'Enterprise data centers and server rooms',
        'Virtualization and hyper-converged infrastructure',
        'Cloud service provider environments',
        'High-performance computing (HPC) clusters',
        'Database and ERP workload hosting',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'User Manual' },
        { label: 'Firmware v3.2.1' },
        { label: 'Compatibility Matrix' },
      ],
    },
  },
  {
    id: 2,
    icon: <ComputerIcon sx={{ fontSize: 56 }} />,
    name: 'Workstation Pro',
    description: 'Powerful workstation for professionals.',
    price: '$3,299',
    category: 'Hardware',
    brand: 'HP',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Workstation+Pro',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Workstation+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=Workstation+Side',
      'https://placehold.co/600x500/475569/FFFFFF?text=Workstation+Ports',
      'https://placehold.co/600x500/64748B/FFFFFF?text=Workstation+Internal',
    ],
    keyFeatures: [
      'Intel Core i9-13900K processor',
      '64GB DDR5 RAM',
      'NVIDIA RTX 4080 GPU',
      '1TB NVMe SSD + 2TB HDD',
      'Thunderbolt 4 connectivity',
      'Precision-calibrated display support',
    ],
    tabContent: {
      description: 'The HP Workstation Pro is engineered for professionals who demand uncompromising performance. From 3D rendering and video editing to complex simulations and software development, this workstation delivers the computational power needed to tackle the most demanding creative and technical workflows with ease.',
      specifications: [
        'Form Factor: Tower workstation',
        'Processor: Intel Core i9-13900K (24 cores, up to 5.8GHz)',
        'Memory: 64GB DDR5-5600MHz (expandable to 128GB)',
        'GPU: NVIDIA RTX 4080 16GB GDDR6X',
        'Storage: 1TB NVMe SSD + 2TB 7200RPM HDD',
        'Connectivity: Thunderbolt 4, USB-C, Wi-Fi 6E',
        'Warranty: 3-year limited hardware warranty',
        'Certification: ISO 9001, CE, RoHS compliant',
      ],
      applications: [
        '3D modeling and animation studios',
        'Video production and post-processing',
        'Software development and testing',
        'Data analysis and scientific computing',
        'CAD/CAM and engineering design',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'User Manual' },
        { label: 'Driver Pack v2.1' },
        { label: 'Quick Start Guide' },
      ],
    },
  },
  {
    id: 3,
    icon: <MemoryIcon sx={{ fontSize: 56 }} />,
    name: 'Memory Module 32GB',
    description: 'High-speed DDR5 RAM for enterprise use.',
    price: '$259',
    category: 'Components',
    brand: 'Corsair',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Memory+Module',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=RAM+Angle',
      'https://placehold.co/600x500/334155/FFFFFF?text=RAM+Top',
      'https://placehold.co/600x500/475569/FFFFFF?text=RAM+PCB',
    ],
    keyFeatures: [
      '32GB (1x32GB) DDR5-5600MHz',
      'CL40 latency',
      '1.25V low voltage operation',
      'Aluminum heat spreader',
      'Intel XMP 3.0 support',
      'Lifetime warranty',
    ],
    tabContent: {
      description: 'The Corsair Memory Module 32GB delivers high-speed DDR5 performance for demanding enterprise applications. With optimized latencies and efficient power management, this module provides the reliability and throughput required for servers, workstations, and high-performance computing environments.',
      specifications: [
        'Capacity: 32GB (1x32GB)',
        'Type: DDR5-5600MHz',
        'Latency: CL40-40-40',
        'Voltage: 1.25V',
        'Form Factor: UDIMM 288-pin',
        'Heat Spreader: Low-profile aluminum',
        'Support: Intel XMP 3.0, AMD EXPO',
        'Warranty: Limited lifetime warranty',
      ],
      applications: [
        'Enterprise server memory expansion',
        'Workstation performance upgrades',
        'Data center virtualization hosts',
        'High-frequency trading systems',
        'Memory-intensive database servers',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'Installation Guide' },
        { label: 'Compatibility List' },
        { label: 'Warranty Information' },
      ],
    },
  },
  {
    id: 4,
    icon: <SecurityIcon sx={{ fontSize: 56 }} />,
    name: 'Security Gateway',
    description: 'Advanced firewall and threat protection.',
    price: '$2,199',
    category: 'Networking',
    brand: 'Cisco',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Security+Gateway',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Gateway+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=Gateway+Back',
      'https://placehold.co/600x500/475569/FFFFFF?text=Gateway+Ports',
      'https://placehold.co/600x500/64748B/FFFFFF?text=Gateway+Rackmount',
    ],
    keyFeatures: [
      'Next-gen firewall (NGFW)',
      'IPS/IDS with 2Gbps throughput',
      'VPN support (IPSec/SSL)',
      'Application visibility and control',
      'Advanced malware protection',
      'Cloud-managed or on-prem',
    ],
    tabContent: {
      description: 'The Cisco Security Gateway provides advanced threat protection and network security for enterprises of all sizes. With next-generation firewall capabilities, intrusion prevention, and application visibility, it safeguards critical assets while enabling secure remote access and compliance with industry regulations.',
      specifications: [
        'Form Factor: 1U rack-mountable',
        'Firewall Throughput: 4Gbps',
        'IPS Throughput: 2Gbps',
        'VPN Throughput: 1Gbps (IPSec)',
        'Concurrent Sessions: 2 million',
        'Ports: 8x GigE, 2x 10GbE SFP+',
        'Management: CLI, Web UI, Cloud Manager',
        'Warranty: 3-year limited hardware warranty',
      ],
      applications: [
        'Enterprise network perimeter security',
        'Branch office firewall and VPN',
        'Data center threat protection',
        'Compliance-driven security deployments',
        'Secure remote access for distributed teams',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'User Manual' },
        { label: 'Firmware v7.4.2' },
        { label: 'Configuration Guide' },
      ],
    },
  },
  {
    id: 5,
    icon: <SpeedIcon sx={{ fontSize: 56 }} />,
    name: 'Network Accelerator',
    description: 'Boost network speed and reduce latency.',
    price: '$1,499',
    category: 'Networking',
    brand: 'Netgear',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Network+Accelerator',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Accelerator+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=Accelerator+Back',
      'https://placehold.co/600x500/475569/FFFFFF?text=Accelerator+LEDs',
    ],
    keyFeatures: [
      '10GbE aggregation capability',
      'Load balancing for WAN links',
      'TCP acceleration technology',
      'WAN optimization',
      'QoS traffic prioritization',
      '1U rack-mountable form factor',
    ],
    tabContent: {
      description: 'The Netgear Network Accelerator optimizes WAN performance and reduces latency for distributed enterprise networks. By combining link aggregation, traffic shaping, and TCP optimization, it ensures that critical applications receive the bandwidth and responsiveness they need, even over long-distance connections.',
      specifications: [
        'Form Factor: 1U rack-mountable',
        'Aggregation: Up to 10GbE',
        'WAN Optimization: TCP acceleration, compression',
        'Load Balancing: Per-packet and per-flow',
        'QoS: Layer 3/4 traffic prioritization',
        'Ports: 4x GigE, 2x 10GbE SFP+',
        'Management: Web UI, CLI, SNMP',
        'Warranty: 2-year limited hardware warranty',
      ],
      applications: [
        'Multi-WAN link aggregation and failover',
        'Branch office WAN optimization',
        'Cloud application acceleration',
        'Video conferencing QoS prioritization',
        'Data replication traffic management',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'Quick Start Guide' },
        { label: 'Firmware v6.1.0' },
        { label: 'CLI Reference Guide' },
      ],
    },
  },
  {
    id: 6,
    icon: <StorageIcon sx={{ fontSize: 56 }} />,
    name: 'NAS Storage Array',
    description: 'Scalable network-attached storage solution.',
    price: '$4,799',
    category: 'Hardware',
    brand: 'Synology',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=NAS+Storage+Array',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=NAS+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=NAS+Drives',
      'https://placehold.co/600x500/475569/FFFFFF?text=NAS+Back',
      'https://placehold.co/600x500/64748B/FFFFFF?text=NAS+Management',
    ],
    keyFeatures: [
      '12-bay hot-swappable SATA/NVMe',
      'Up to 144TB raw storage capacity',
      'Dual 2.5GbE ports',
      'Built-in backup and sync apps',
      'RAID 0/1/5/6/10 support',
      'Active Directory integration',
    ],
    tabContent: {
      description: 'The Synology NAS Storage Array provides scalable and reliable network-attached storage for enterprise data management. With support for multiple RAID configurations, built-in backup applications, and seamless integration with existing directory services, it offers a comprehensive solution for data protection, file sharing, and remote access.',
      specifications: [
        'Form Factor: 2U rack-mountable',
        'Drive Bays: 12x hot-swappable (SATA/NVMe)',
        'Max Capacity: 144TB (12x 12TB HDD)',
        'Processor: Intel Xeon D-1622 4-core',
        'Memory: 16GB DDR4 ECC (upgradeable to 64GB)',
        'Networking: Dual 2.5GbE, optional 10GbE',
        'RAID: 0, 1, 5, 6, 10, JBOD',
        'Warranty: 3-year limited hardware warranty',
      ],
      applications: [
        'Centralized file storage and sharing',
        'Backup and disaster recovery',
        'Surveillance video recording',
        'Virtual machine storage (iSCSI/NFS)',
        'Media asset management',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'User Manual' },
        { label: 'DSM v7.2 Release Notes' },
        { label: 'RAID Calculator' },
      ],
    },
  },
  {
    id: 7,
    icon: <RouterIcon sx={{ fontSize: 56 }} />,
    name: 'Edge Router X9',
    description: 'Enterprise-grade routing for branch offices.',
    price: '$1,899',
    category: 'Networking',
    brand: 'Ubiquiti',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Edge+Router+X9',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Router+Front',
      'https://placehold.co/600x500/334155/FFFFFF?text=Router+Back',
      'https://placehold.co/600x500/475569/FFFFFF?text=Router+Ports',
      'https://placehold.co/600x500/64748B/FFFFFF?text=Router+Setup',
    ],
    keyFeatures: [
      '9x Gigabit Ethernet ports',
      'Advanced routing protocols (OSPF/BGP)',
      'Hardware-accelerated NAT',
      'VLAN and VPN support',
      'CLI and web-based management',
      'Passive cooling, fanless design',
    ],
    tabContent: {
      description: 'The Ubiquiti Edge Router X9 delivers enterprise-grade routing capabilities in a compact, fanless form factor. Designed for branch offices and remote sites, it supports advanced protocols including OSPF and BGP, hardware-accelerated NAT, and comprehensive VLAN management — all with silent operation and minimal power consumption.',
      specifications: [
        'Form Factor: Desktop / wall-mountable',
        'Ports: 9x Gigabit Ethernet',
        'Routing: Static, OSPF, BGP, RIP',
        'NAT: Hardware-accelerated, 1Gbps line rate',
        'VLAN: 802.1Q with Q-in-Q support',
        'VPN: Site-to-site IPsec, OpenVPN',
        'Management: Web UI, CLI, UNMS',
        'Cooling: Passive (fanless, silent)',
      ],
      applications: [
        'Branch office edge routing',
        'Retail and hospitality networks',
        'Managed service provider (MSP) deployments',
        'Secure site-to-site VPN connectivity',
        'Guest network segmentation and VLANs',
      ],
      downloads: [
        { label: 'Datasheet (PDF)' },
        { label: 'Quick Start Guide' },
        { label: 'EdgeOS v2.0 Firmware' },
        { label: 'CLI Reference' },
      ],
    },
  },
  {
    id: 8,
    icon: <SmartphoneIcon sx={{ fontSize: 56 }} />,
    name: 'Mobile Management',
    description: 'Endpoint management for mobile devices.',
    price: '$699',
    category: 'Software',
    brand: 'VMware',
    images: [
      'https://placehold.co/600x500/0F172A/E53935?text=Mobile+Management',
      'https://placehold.co/600x500/1E293B/FFFFFF?text=Dashboard',
      'https://placehold.co/600x500/334155/FFFFFF?text=Device+List',
      'https://placehold.co/600x500/475569/FFFFFF?text=Policies',
      'https://placehold.co/600x500/64748B/FFFFFF?text=Analytics',
      'https://placehold.co/600x500/0F172A/FFFFFF?text=Security',
    ],
    keyFeatures: [
      'Unified endpoint management (UEM)',
      'Supports iOS, Android, Windows, macOS',
      'Over-the-air policy deployment',
      'Containerized enterprise apps',
      'Compliance monitoring and reporting',
      'Integration with Azure AD / Okta',
    ],
    tabContent: {
      description: 'VMware Mobile Management provides comprehensive unified endpoint management (UEM) for today\'s diverse device landscape. With support for iOS, Android, Windows, and macOS, IT administrators can deploy policies, manage applications, and ensure compliance across the entire device fleet from a single, integrated console.',
      specifications: [
        'Platform: Cloud-hosted or on-premises',
        'Supported OS: iOS, Android, Windows 10/11, macOS',
        'Deployment: OTA policy and app deployment',
        'Security: Containerization, encryption, remote wipe',
        'Integration: Azure AD, Okta, Google Workspace',
        'Compliance: Real-time monitoring and reporting',
        'API: RESTful API for third-party integration',
        'Licensing: Per-device annual subscription',
      ],
      applications: [
        'Corporate-owned device management',
        'Bring-your-own-device (BYOD) programs',
        'Remote workforce enablement',
        'Healthcare device compliance (HIPAA)',
        'Kiosk and dedicated device management',
      ],
      downloads: [
        { label: 'Product Brochure (PDF)' },
        { label: 'Admin Guide' },
        { label: 'API Documentation' },
        { label: 'Free Trial License' },
      ],
    },
  },
]


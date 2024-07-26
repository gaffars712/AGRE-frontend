import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutSectionContentSection extends Schema.Component {
  collectionName: 'components_about_content';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<'.'>;
    firstImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    secondImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    fullImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mainTitle: Attribute.String;
    shortDes: Attribute.String;
    Desc: Attribute.RichText;
    path: Attribute.String & Attribute.Required;
  };
}

export interface BlogSectionPostSection extends Schema.Component {
  collectionName: 'components_blog_posts';
  info: {
    displayName: 'post';
    description: '';
  };
  attributes: {
    postImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
    Desc: Attribute.Text;
  };
}

export interface BlogSectionRecentBlog extends Schema.Component {
  collectionName: 'components_blog_section_recent_blogs';
  info: {
    displayName: 'recentBlog';
  };
  attributes: {
    title: Attribute.Text;
    Desc: Attribute.Text;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ConteactUsSectionAddInfo extends Schema.Component {
  collectionName: 'components_conteact_us_section_add_infos';
  info: {
    displayName: 'add-info';
    description: '';
  };
  attributes: {
    officeAddress: Attribute.Text;
    hoursOpen: Attribute.Text;
    email: Attribute.String;
    contectNumber: Attribute.BigInteger;
    addURL: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<"Search Your project's location on google map and click on share / Embed a map COPY HTML and remove this all and past here.">;
  };
}

export interface ConteactUsSectionAddLabels extends Schema.Component {
  collectionName: 'components_conteact_us_section_add_labels';
  info: {
    displayName: 'addLabels';
    description: '';
  };
  attributes: {
    emailLabel: Attribute.String;
    contectLabel: Attribute.String;
    HoursLabel: Attribute.String;
    officeLabel: Attribute.String;
    addBTN: Attribute.String;
  };
}

export interface ConteactUsSectionBanner extends Schema.Component {
  collectionName: 'components_conteact_us_section_banners';
  info: {
    displayName: 'banner';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ConteactUsSectionFormLabels extends Schema.Component {
  collectionName: 'components_conteact_us_section_form_labels';
  info: {
    displayName: 'formLabels';
    description: '';
  };
  attributes: {
    formTitle: Attribute.String;
    nameLabel: Attribute.String;
    numberLabel: Attribute.String;
    emailLabel: Attribute.String;
    interestLabel: Attribute.String;
    formBTN: Attribute.String;
    formTerms: Attribute.Text;
    inerestedOptionsEN: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Apartment', 'Villa', 'Office Space ', 'etc']
      >;
    inerestedOptionsAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0634\u0642\u0629',
          '\u0641\u064A\u0644\u0627',
          '\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0645\u0643\u062A\u0628 ',
          '\u0625\u0644\u062E',
          ''
        ]
      >;
  };
}

export interface FaqSectionFaqs extends Schema.Component {
  collectionName: 'components_faq_section_faqs';
  info: {
    displayName: 'faqs';
    description: '';
  };
  attributes: {
    faq: Attribute.Text;
    Desc: Attribute.RichText;
  };
}

export interface FooterSectionCopyRight extends Schema.Component {
  collectionName: 'components_footer_section_copy_rights';
  info: {
    displayName: 'copyRight';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface FooterSectionFollowLinks extends Schema.Component {
  collectionName: 'components_footer_section_follow_links';
  info: {
    displayName: 'followLinks';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.Text & Attribute.Required;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface FooterSectionFollowTitle extends Schema.Component {
  collectionName: 'components_footer_section_follow_titles';
  info: {
    displayName: 'followTitle';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface FooterSectionMainSection extends Schema.Component {
  collectionName: 'components_footer_mains';
  info: {
    displayName: 'main';
    description: '';
  };
  attributes: {
    main: Attribute.JSON;
  };
}

export interface FooterSectionWebSection extends Schema.Component {
  collectionName: 'components_footer_webs';
  info: {
    displayName: 'web';
    description: '';
  };
  attributes: {
    info: Attribute.JSON;
  };
}

export interface HomeSectionsCommercialSection extends Schema.Component {
  collectionName: 'components_home_commercial';
  info: {
    displayName: 'commercial';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    viewBTN: Attribute.String & Attribute.Required;
  };
}

export interface HomeSectionsHeroSection extends Schema.Component {
  collectionName: 'components_home_hero';
  info: {
    displayName: 'heroS';
    description: '';
  };
  attributes: {
    heroContent: Attribute.Text;
    heroImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
  };
}

export interface HomeSectionsImageSlider extends Schema.Component {
  collectionName: 'components_home_image_sliders';
  info: {
    displayName: 'slider';
    description: '';
  };
  attributes: {
    caption: Attribute.String;
    residentialImg: Attribute.Media<'images'>;
    redirectURL: Attribute.String;
  };
}

export interface HomeSectionsResidentialSection extends Schema.Component {
  collectionName: 'components_home__residential_';
  info: {
    displayName: 'residential';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    viewBTN: Attribute.String & Attribute.Required;
  };
}

export interface HomeSectionsUpcomingSection extends Schema.Component {
  collectionName: 'components_home_upcoming';
  info: {
    displayName: 'upcoming';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    viewBTN: Attribute.String & Attribute.Required;
  };
}

export interface NavbarSectionDropdownItem extends Schema.Component {
  collectionName: 'components_navbar_section_dropdown_items';
  info: {
    displayName: 'dropdownItem';
  };
  attributes: {
    name: Attribute.String;
    path: Attribute.String;
  };
}

export interface NavbarSectionNavbarList extends Schema.Component {
  collectionName: 'components_navbar_section_navbar_lists';
  info: {
    displayName: 'navbarList';
    description: '';
  };
  attributes: {
    listName: Attribute.String;
    listPath: Attribute.String;
    isDropdown: Attribute.Enumeration<['true', 'false']> &
      Attribute.DefaultTo<'false'>;
    dropdownItem: Attribute.Component<'navbar-section.dropdown-item', true>;
  };
}

export interface NewsAndPressSectionHeroSection extends Schema.Component {
  collectionName: 'components_news_and_press_heros';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.Text;
  };
}

export interface NewsAndPressSectionNewsContent extends Schema.Component {
  collectionName: 'components_news_and_press_news_contents';
  info: {
    displayName: 'newsContent';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.Text;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface NewsAndPressSectionNews extends Schema.Component {
  collectionName: 'components_news_and_press_news';
  info: {
    displayName: 'news';
    description: '';
  };
  attributes: {
    title: Attribute.Text;
    Desc: Attribute.Text;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date: Attribute.Date;
  };
}

export interface PhotoGallerySectionHero extends Schema.Component {
  collectionName: 'components_photo_gallery_section_heroes';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.String;
  };
}

export interface ProjectDetailsSectionContentSection extends Schema.Component {
  collectionName: 'components_project_details_contents';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    title: Attribute.Text;
    Desc: Attribute.Text;
    projectImgs: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ProjectDetailsSectionHeroSection extends Schema.Component {
  collectionName: 'components_project_details_heros';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    bannerimg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProjectDetailsSectionLocationFeature extends Schema.Component {
  collectionName: 'components_project_details_location_features';
  info: {
    displayName: 'locationF';
    description: '';
  };
  attributes: {
    feature: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    featureName: Attribute.String & Attribute.Required;
  };
}

export interface ProjectDetailsSectionLocationSection extends Schema.Component {
  collectionName: 'components_project_details_locations';
  info: {
    displayName: 'location';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.Text;
    locationImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProjectDetailsSectionPlanSection extends Schema.Component {
  collectionName: 'components_project_details_plans';
  info: {
    displayName: 'plan';
    description: '';
  };
  attributes: {
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String & Attribute.Required;
    Desc: Attribute.Text;
  };
}

export interface ProjectDetailsSectionProjectFeature extends Schema.Component {
  collectionName: 'components_project_details_project_features';
  info: {
    displayName: 'projectF';
    description: '';
  };
  attributes: {
    feature: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    featureName: Attribute.String & Attribute.Required;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDesc: Attribute.Text;
  };
}

export interface UpcomingSectionAllUpcoming extends Schema.Component {
  collectionName: 'components_upcoming_section_all_upcomings';
  info: {
    displayName: 'allUpcoming';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.Text;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sliderImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    proName: Attribute.String;
    viewBTN: Attribute.String;
  };
}

export interface UpcomingSectionHero extends Schema.Component {
  collectionName: 'components_upcoming_section_heroes';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    countName: Attribute.String;
  };
}

export interface VideoGallerySectionHeroSection extends Schema.Component {
  collectionName: 'components_video_gallery_heros';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Desc: Attribute.Text;
    channelLink: Attribute.Text & Attribute.Required;
    SubsBTN: Attribute.String;
  };
}

export interface VideoGallerySectionVideoSection extends Schema.Component {
  collectionName: 'components_video_gallery_videos';
  info: {
    displayName: 'video';
    description: '';
  };
  attributes: {
    videoLinks: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about-section.content-section': AboutSectionContentSection;
      'blog-section.post-section': BlogSectionPostSection;
      'blog-section.recent-blog': BlogSectionRecentBlog;
      'conteact-us-section.add-info': ConteactUsSectionAddInfo;
      'conteact-us-section.add-labels': ConteactUsSectionAddLabels;
      'conteact-us-section.banner': ConteactUsSectionBanner;
      'conteact-us-section.form-labels': ConteactUsSectionFormLabels;
      'faq-section.faqs': FaqSectionFaqs;
      'footer-section.copy-right': FooterSectionCopyRight;
      'footer-section.follow-links': FooterSectionFollowLinks;
      'footer-section.follow-title': FooterSectionFollowTitle;
      'footer-section.main-section': FooterSectionMainSection;
      'footer-section.web-section': FooterSectionWebSection;
      'home-sections.commercial-section': HomeSectionsCommercialSection;
      'home-sections.hero-section': HomeSectionsHeroSection;
      'home-sections.image-slider': HomeSectionsImageSlider;
      'home-sections.residential-section': HomeSectionsResidentialSection;
      'home-sections.upcoming-section': HomeSectionsUpcomingSection;
      'navbar-section.dropdown-item': NavbarSectionDropdownItem;
      'navbar-section.navbar-list': NavbarSectionNavbarList;
      'news-and-press-section.hero-section': NewsAndPressSectionHeroSection;
      'news-and-press-section.news-content': NewsAndPressSectionNewsContent;
      'news-and-press-section.news': NewsAndPressSectionNews;
      'photo-gallery-section.hero': PhotoGallerySectionHero;
      'project-details-section.content-section': ProjectDetailsSectionContentSection;
      'project-details-section.hero-section': ProjectDetailsSectionHeroSection;
      'project-details-section.location-feature': ProjectDetailsSectionLocationFeature;
      'project-details-section.location-section': ProjectDetailsSectionLocationSection;
      'project-details-section.plan-section': ProjectDetailsSectionPlanSection;
      'project-details-section.project-feature': ProjectDetailsSectionProjectFeature;
      'shared.seo': SharedSeo;
      'upcoming-section.all-upcoming': UpcomingSectionAllUpcoming;
      'upcoming-section.hero': UpcomingSectionHero;
      'video-gallery-section.hero-section': VideoGallerySectionHeroSection;
      'video-gallery-section.video-section': VideoGallerySectionVideoSection;
    }
  }
}

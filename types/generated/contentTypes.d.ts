import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsAboutUs extends Schema.CollectionType {
  collectionName: 'about_uses';
  info: {
    singularName: 'about-us';
    pluralName: 'about-uses';
    displayName: 'about-us';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    firstImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    secondImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fullImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    mainTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    shortDes: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Desc: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'/'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::about-us.about-us',
      'oneToMany',
      'api::about-us.about-us'
    >;
    locale: Attribute.String;
  };
}

export interface ApiAllNewsAllNews extends Schema.CollectionType {
  collectionName: 'news';
  info: {
    singularName: 'all-news';
    pluralName: 'news';
    displayName: 'news';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Desc: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    date: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::all-news.all-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::all-news.all-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::all-news.all-news',
      'oneToMany',
      'api::all-news.all-news'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'blogHero';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Desc: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    post: Attribute.DynamicZone<['blog-section.post-section']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogSectionBlogSection extends Schema.CollectionType {
  collectionName: 'blog_sections';
  info: {
    singularName: 'blog-section';
    pluralName: 'blog-sections';
    displayName: 'Blog Section';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Desc: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-section.blog-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-section.blog-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog-section.blog-section',
      'oneToMany',
      'api::blog-section.blog-section'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCommercialProjectCommercialProject
  extends Schema.CollectionType {
  collectionName: 'commercial_projects';
  info: {
    singularName: 'commercial-project';
    pluralName: 'commercial-projects';
    displayName: 'CommercialProject';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    SliderImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    bannerImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    proName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proTitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proImgs: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    locationTitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationDesc: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proParking: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proSize: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proPrice: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proUnit: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ProAddress: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Attribute.UID &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proFeature: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Ample Car Parking Space',
          '24 x 7 Security & Maintenance Service',
          'Badminton Court',
          'Barbeque Area',
          'Children Play Area',
          'Coffee Shop',
          'EV Charging Station',
          'Free Chiller',
          'Free Cooking Gas',
          'Free Dewa For Office',
          'Fully Fitted Kitchen',
          'Fully Equipped Gymnasium',
          'Jacuzzi',
          'Jogging Track',
          'Library',
          'Loading Unloading Warehouses',
          'Sauna Room',
          'Swimming Pool',
          'Close Public Transport',
          'Kitchen Facility Free DEWA for Offices',
          'Kitchen Facility',
          'Free DEWA for  Offices'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationFeature: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Dubai Frame',
          'Zabeel Park',
          'Dubai Creek',
          'Wifi Mall',
          'Dubai Garden Glow',
          'Dubai World Trade Center (DWTC)',
          'Al Seef',
          'Burj AI Arab',
          'Jumeirah Beach',
          'The Palm Jumeirah',
          'Madinat Jumeirah',
          'Wild Wadi Water Park',
          'Jumeirah Mosque',
          'Mercato Shopping Mall',
          'City Walk',
          'Box Park',
          'Dubai Canal',
          'Deira Gold Souk',
          'Spice Souk',
          'Naif Souk',
          'Abraa',
          'Al Fahidi Historic',
          'District (Al Bastakiya)',
          'Dubai Safari',
          'Dubai Lagoons',
          'Dragon Market',
          'Auto Market',
          'Ras Al Khor Wildlife Sanctury',
          'Meydan'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationURL: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<"Search Your project's location on google map and click on share / Embed a map COPY HTML and remove this all and past here.">;
    proType: Attribute.Enumeration<
      [
        'Retail',
        '\u0628\u064A\u0639 \u0628\u0627\u0644\u062A\u062C\u0632\u0626\u0629',
        'Office',
        '\u0645\u0643\u062A\u0628',
        'Retail - F&B',
        '\u0627\u0644\u0628\u064A\u0639 \u0628\u0627\u0644\u062A\u062C\u0632\u0626\u0629 - \u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0634\u0631\u0648\u0628\u0627\u062A'
      ]
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proDesc: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isRent: Attribute.Enumeration<['true', 'false']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proPlans: Attribute.Component<
      'project-details-section.plan-section',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proFeatureAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0645\u0633\u0627\u062D\u0629 \u0648\u0627\u0633\u0639\u0629 \u0644\u0648\u0642\u0648\u0641 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A',
          '\u062E\u062F\u0645\u0629 \u0627\u0644\u0623\u0645\u0646 \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629 24 \u00D7 7',
          '\u062A\u0646\u0633 \u0627\u0644\u0631\u064A\u0634\u0629',
          '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u0648\u0627\u0621',
          '\u0645\u0646\u0637\u0642\u0629 \u0644\u0639\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644',
          '\u0645\u0642\u0647\u0649',
          '\u0645\u062D\u0637\u0629 \u0634\u062D\u0646 EV',
          '\u0645\u0628\u0631\u062F \u0645\u062C\u0627\u0646\u064A',
          '\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u062E \u0645\u062C\u0627\u0646\u064A',
          '\u062F\u064A\u0648\u0627 \u0645\u062C\u0627\u0646\u0627 \u0644\u0644\u0645\u0643\u062A\u0628',
          '\u0645\u0637\u0628\u062E \u0645\u062C\u0647\u0632 \u0628\u0627\u0644\u0643\u0627\u0645\u0644',
          '\u0635\u0627\u0644\u0629 \u0623\u0644\u0639\u0627\u0628 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u062C\u0647\u0632\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644',
          '\u062C\u0627\u0643\u0648\u0632\u064A',
          '\u0627\u0644\u0631\u0643\u0636 \u0627\u0644\u0645\u0633\u0627\u0631',
          '\u0645\u0643\u062A\u0628\u0629',
          '\u062A\u062D\u0645\u064A\u0644 \u0648\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639\u0627\u062A',
          '\u063A\u0631\u0641\u0629 \u0633\u0627\u0648\u0646\u0627',
          '\u062D\u0645\u0627\u0645 \u0627\u0644\u0633\u0628\u0627\u062D\u0629',
          '\u0625\u063A\u0644\u0627\u0642 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0646\u0642\u0644 \u0627\u0644\u0639\u0627\u0645',
          '\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0637\u0628\u062E \u0647\u064A\u0626\u0629 \u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0645\u064A\u0627\u0647 \u062F\u0628\u064A \u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0644\u0645\u0643\u0627\u062A\u0628',
          '\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0637\u0628\u062E',
          '\u0647\u064A\u0626\u0629 \u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0645\u064A\u0627\u0647 \u062F\u0628\u064A \u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0644\u0645\u0643\u0627\u062A\u0628'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationFeatureAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0625\u0637\u0627\u0631 \u062F\u0628\u064A',
          '\u062D\u062F\u064A\u0642\u0629 \u0632\u0639\u0628\u064A\u0644',
          '\u062E\u0648\u0631 \u062F\u0628\u064A',
          '\u0648\u0627\u064A \u0641\u0627\u064A \u0645\u0648\u0644',
          '\u062F\u0628\u064A \u062C\u0627\u0631\u062F\u0646 \u062C\u0644\u0648',
          '\u0645\u0631\u0643\u0632 \u062F\u0628\u064A \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A (DWTC)',
          '\u0627\u0644\u0633\u064A\u0641',
          '\u0628\u0631\u062C \u0627\u0644\u0639\u0631\u0628',
          '\u0634\u0627\u0637\u0626 \u062C\u0645\u064A\u0631\u0627',
          '\u0646\u062E\u0644\u0629 \u062C\u0645\u064A\u0631\u0627',
          '\u0645\u062F\u064A\u0646\u0629 \u062C\u0645\u064A\u0631\u0627',
          '\u062D\u062F\u064A\u0642\u0629 \u0648\u0627\u064A\u0644\u062F \u0648\u0627\u062F\u064A \u0627\u0644\u0645\u0627\u0626\u064A\u0629',
          '\u0645\u0633\u062C\u062F \u062C\u0645\u064A\u0631\u0627',
          '\u0645\u0631\u0643\u0632 \u062A\u0633\u0648\u0642 \u0645\u064A\u0631\u0643\u0627\u062A\u0648',
          '\u0633\u064A\u062A\u064A \u0648\u0648\u0643',
          '\u0642\u0646\u0627\u0629 \u062F\u0628\u064A',
          '\u0633\u0648\u0642 \u062F\u064A\u0631\u0629 \u0644\u0644\u0630\u0647\u0628',
          '\u0633\u0648\u0642 \u0627\u0644\u062A\u0648\u0627\u0628\u0644',
          '\u0633\u0648\u0642 \u0646\u0627\u064A\u0641',
          '\u0639\u0628\u0631\u0629',
          '\u0627\u0644\u0641\u0647\u064A\u062F\u064A \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u064A\u0629',
          '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 (\u0627\u0644\u0628\u0633\u062A\u0643\u064A\u0629)',
          '\u062F\u0628\u064A \u0633\u0641\u0627\u0631\u064A',
          '\u0628\u062D\u064A\u0631\u0627\u062A \u062F\u0628\u064A',
          '\u0633\u0648\u0642 \u0627\u0644\u062A\u0646\u064A\u0646',
          '\u0633\u0648\u0642 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A',
          '\u0645\u062D\u0645\u064A\u0629 \u0631\u0623\u0633 \u0627\u0644\u062E\u0648\u0631 \u0644\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0628\u0631\u064A\u0629',
          '\u0645\u064A\u062F\u0627\u0646',
          '',
          '',
          '',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    idSlug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    communitie: Attribute.Enumeration<['true', 'false']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'false'>;
    proShortName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::commercial-project.commercial-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::commercial-project.commercial-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::commercial-project.commercial-project',
      'oneToMany',
      'api::commercial-project.commercial-project'
    >;
    locale: Attribute.String;
  };
}

export interface ApiContactUsFormContactUsForm extends Schema.CollectionType {
  collectionName: 'contact_us_forms';
  info: {
    singularName: 'contact-us-form';
    pluralName: 'contact-us-forms';
    displayName: 'Contact Us Form';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    number: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    email: Attribute.Email &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    interest: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us-form.contact-us-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us-form.contact-us-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::contact-us-form.contact-us-form',
      'oneToMany',
      'api::contact-us-form.contact-us-form'
    >;
    locale: Attribute.String;
  };
}

export interface ApiContectUsContectUs extends Schema.CollectionType {
  collectionName: 'contect_uses';
  info: {
    singularName: 'contect-us';
    pluralName: 'contect-uses';
    displayName: 'contect-us';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    banner: Attribute.Component<'conteact-us-section.banner', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    addInfo: Attribute.Component<'conteact-us-section.add-info', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    addLabels: Attribute.Component<'conteact-us-section.add-labels', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formLabels: Attribute.Component<'conteact-us-section.form-labels', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contect-us.contect-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contect-us.contect-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::contect-us.contect-us',
      'oneToMany',
      'api::contect-us.contect-us'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    faqs: Attribute.DynamicZone<['faq-section.faqs']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fromPage: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fromPagePath: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::faq.faq',
      'oneToMany',
      'api::faq.faq'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFilterFilter extends Schema.CollectionType {
  collectionName: 'filters';
  info: {
    singularName: 'filter';
    pluralName: 'filters';
    displayName: 'filter';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    titleOne: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleTwo: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    searchPlaceholder: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    types: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Type', 'Villa', 'Apartment']
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    bedRooms: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Bedrooms',
          '1 Bedroom',
          '2 Bedroom',
          '3 Bedroom ',
          '4 Bedroom',
          '5 Bedroom'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    SearchBTN: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    typesAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u064A\u0643\u062A\u0628',
          '\u0641\u064A\u0644\u0627',
          '\u0634\u0642\u0629',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    bedRoomsAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          '1 \u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          '2 \u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          '3 \u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          '4 \u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          '5 \u063A\u0631\u0641\u0629 \u0646\u0648\u0645',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    typesCommercial: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Type', 'Office', 'Retail']
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    typesCommercialAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u064A\u0643\u062A\u0628',
          '\u0645\u0643\u062A\u0628',
          '\u0628\u064A\u0639 \u0628\u0627\u0644\u062A\u062C\u0632\u0626\u0629',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::filter.filter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::filter.filter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::filter.filter',
      'oneToMany',
      'api::filter.filter'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFooterFooter extends Schema.CollectionType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    main: Attribute.Component<'footer-section.main-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Info: Attribute.Component<'footer-section.web-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    followLinks: Attribute.Component<'footer-section.follow-links', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    copy: Attribute.Component<'footer-section.copy-right', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    followOn: Attribute.Component<'footer-section.follow-title', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer.footer'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGlobalGlobal extends Schema.SingleType {
  collectionName: 'globals';
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'global';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::global.global',
      'oneToMany',
      'api::global.global'
    >;
    locale: Attribute.String;
  };
}

export interface ApiHomeHome extends Schema.CollectionType {
  collectionName: 'homepage';
  info: {
    singularName: 'home';
    pluralName: 'homepage';
    displayName: 'Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    slug: Attribute.UID & Attribute.DefaultTo<'home'>;
    contentSection: Attribute.DynamicZone<
      [
        'home-sections.hero-section',
        'home-sections.residential-section',
        'home-sections.commercial-section',
        'home-sections.upcoming-section'
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::home.home',
      'oneToMany',
      'api::home.home'
    >;
    locale: Attribute.String;
  };
}

export interface ApiInformationSecurityInformationSecurity
  extends Schema.CollectionType {
  collectionName: 'information_securities';
  info: {
    singularName: 'information-security';
    pluralName: 'information-securities';
    displayName: 'Information Security';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::information-security.information-security',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::information-security.information-security',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::information-security.information-security',
      'oneToMany',
      'api::information-security.information-security'
    >;
    locale: Attribute.String;
  };
}

export interface ApiMediaNavMediaNav extends Schema.CollectionType {
  collectionName: 'media_navs';
  info: {
    singularName: 'media-nav';
    pluralName: 'media-navs';
    displayName: 'mediaNav';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    path: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-nav.media-nav',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::media-nav.media-nav',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::media-nav.media-nav',
      'oneToMany',
      'api::media-nav.media-nav'
    >;
    locale: Attribute.String;
  };
}

export interface ApiNavbarNavbar extends Schema.CollectionType {
  collectionName: 'navbardata';
  info: {
    singularName: 'navbar';
    pluralName: 'navbardata';
    displayName: 'Navbar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    navList: Attribute.Component<'navbar-section.navbar-list', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    searchPlaceholder: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navbar.navbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navbar.navbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::navbar.navbar',
      'oneToMany',
      'api::navbar.navbar'
    >;
    locale: Attribute.String;
  };
}

export interface ApiNewsAndPressNewsAndPress extends Schema.CollectionType {
  collectionName: 'news_and_presses';
  info: {
    singularName: 'news-and-press';
    pluralName: 'news-and-presses';
    displayName: 'NewsAndPress';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    hero: Attribute.Component<'news-and-press-section.hero-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::news-and-press.news-and-press',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::news-and-press.news-and-press',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::news-and-press.news-and-press',
      'oneToMany',
      'api::news-and-press.news-and-press'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPhotoGalleryPhotoGallery extends Schema.CollectionType {
  collectionName: 'photo_galleries';
  info: {
    singularName: 'photo-gallery';
    pluralName: 'photo-galleries';
    displayName: 'photo-gallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    hero: Attribute.Component<'photo-gallery-section.hero', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    commercialP: Attribute.Component<'home-sections.image-slider', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    residetialP: Attribute.Component<'home-sections.image-slider', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToMany',
      'api::photo-gallery.photo-gallery'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    text: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Schema.CollectionType {
  collectionName: 'privacy_policies';
  info: {
    singularName: 'privacy-policy';
    pluralName: 'privacy-policies';
    displayName: 'Privacy Policy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToMany',
      'api::privacy-policy.privacy-policy'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPropertiePropertie extends Schema.CollectionType {
  collectionName: 'properties';
  info: {
    singularName: 'propertie';
    pluralName: 'properties';
    displayName: 'propertie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    mainTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleOne: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleTwo: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    shortDes: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleOneTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleTwoTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::propertie.propertie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::propertie.propertie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::propertie.propertie',
      'oneToMany',
      'api::propertie.propertie'
    >;
    locale: Attribute.String;
  };
}

export interface ApiRegisterFormRegisterForm extends Schema.CollectionType {
  collectionName: 'register_forms';
  info: {
    singularName: 'register-form';
    pluralName: 'register-forms';
    displayName: 'Register Form';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    fullName: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    number: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    nationality: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    unitType: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    comment: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formType: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projectName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::register-form.register-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::register-form.register-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::register-form.register-form',
      'oneToMany',
      'api::register-form.register-form'
    >;
    locale: Attribute.String;
  };
}

export interface ApiRegisterLabelRegisterLabel extends Schema.CollectionType {
  collectionName: 'register_labels';
  info: {
    singularName: 'register-label';
    pluralName: 'register-labels';
    displayName: 'Register Label';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    formTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    propertyTypeLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    oneType: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    twoType: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    nameLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emailLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numberLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    nationalityLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    UnitLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    messageLabel: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formBTN: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    termsLable: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::register-label.register-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::register-label.register-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::register-label.register-label',
      'oneToMany',
      'api::register-label.register-label'
    >;
    locale: Attribute.String;
  };
}

export interface ApiRentalTermRentalTerm extends Schema.CollectionType {
  collectionName: 'rental_terms';
  info: {
    singularName: 'rental-term';
    pluralName: 'rental-terms';
    displayName: 'rental-term';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Desc: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rental-term.rental-term',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::rental-term.rental-term',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::rental-term.rental-term',
      'oneToMany',
      'api::rental-term.rental-term'
    >;
    locale: Attribute.String;
  };
}

export interface ApiResidentialProjectResidentialProject
  extends Schema.CollectionType {
  collectionName: 'residential_projects';
  info: {
    singularName: 'residential-project';
    pluralName: 'residential-projects';
    displayName: 'ResidentialProject';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    SliderImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    bannerImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    proName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proTitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proImgs: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    proPlans: Attribute.Component<
      'project-details-section.plan-section',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationDesc: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proParking: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proSize: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proPrice: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proUnit: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ProAddress: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Attribute.UID & Attribute.Required;
    proFeature: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Ample Car Parking Space',
          '24 x 7 Security & Maintenance Service',
          'Badminton Court',
          'Barbeque Area',
          'Children Play Area',
          'Coffee Shop',
          'EV Charging Station',
          'Free Chiller',
          'Free Cooking Gas',
          'Free Dewa For Office',
          'Fully Fitted Kitchen',
          'Fully Equipped Gymnasium',
          'Jacuzzi',
          'Jogging Track',
          'Library',
          'Loading Unloading Warehouses',
          'Sauna Room',
          'Swimming Pool',
          'Close Public Transport',
          'Kitchen Facility Free DEWA for Offices',
          'Modern And Recently Refurbished Villas',
          'Luxurious Finishes',
          'Great Location',
          'Beautiful Landscape And Garden',
          '24 x 7 Security & Maintenance Service',
          'In House Gym With Equipment',
          'Furnished Kitchen And Outdoor',
          'Private Swimming Pool'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationFeature: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Dubai Frame',
          'Zabeel Park',
          'Dubai Creek',
          'Wifi Mall',
          'Dubai Garden Glow',
          'Dubai World Trade Center (DWTC)',
          'Al Seef',
          'Burj AI Arab',
          'Jumeirah Beach',
          'The Palm Jumeirah',
          'Madinat Jumeirah',
          'Wild Wadi Water Park',
          'Jumeirah Mosque',
          'Mercato Shopping Mall',
          'City Walk',
          'Box Park',
          'Dubai Canal',
          'Deira Gold Souk',
          'Spice Souk',
          'Naif Souk',
          'Abraa',
          'Al Fahidi Historic',
          'District (Al Bastakiya)',
          'Dubai Safari',
          'Dubai Lagoons',
          'Dragon Market',
          'Auto Market',
          'Ras Al Khor Wildlife Sanctury',
          'Meydan',
          'Cultural Sites',
          'Dubai Garden Glow',
          'Dubai Creek Park',
          'Dubai Opera',
          'Bastakiya Art Area',
          'Restaurants and Cafes'
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationURL: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<"Search Your project's location on google map and click on share / Embed a map COPY HTML and remove this all and past here.">;
    proType: Attribute.Enumeration<
      ['Villa', '\u0641\u064A\u0644\u0627', 'Apartment', '\u0634\u0642\u0629']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proDesc: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isRent: Attribute.Enumeration<['true', 'false']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    proFeatureAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0645\u0633\u0627\u062D\u0629 \u0648\u0627\u0633\u0639\u0629 \u0644\u0648\u0642\u0648\u0641 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A',
          '\u062E\u062F\u0645\u0629 \u0627\u0644\u0623\u0645\u0646 \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629 24 \u00D7 7',
          '\u062A\u0646\u0633 \u0627\u0644\u0631\u064A\u0634\u0629',
          '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u0648\u0627\u0621',
          '\u0645\u0646\u0637\u0642\u0629 \u0644\u0639\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644',
          '\u0645\u0642\u0647\u0649',
          '\u0645\u062D\u0637\u0629 \u0634\u062D\u0646 EV',
          '\u0645\u0628\u0631\u062F \u0645\u062C\u0627\u0646\u064A',
          '\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u062E \u0645\u062C\u0627\u0646\u064A',
          '\u062F\u064A\u0648\u0627 \u0645\u062C\u0627\u0646\u0627 \u0644\u0644\u0645\u0643\u062A\u0628',
          '\u0645\u0637\u0628\u062E \u0645\u062C\u0647\u0632 \u0628\u0627\u0644\u0643\u0627\u0645\u0644',
          '\u0635\u0627\u0644\u0629 \u0623\u0644\u0639\u0627\u0628 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u062C\u0647\u0632\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644',
          '\u062C\u0627\u0643\u0648\u0632\u064A',
          '\u0627\u0644\u0631\u0643\u0636 \u0627\u0644\u0645\u0633\u0627\u0631',
          '\u0645\u0643\u062A\u0628\u0629',
          '\u062A\u062D\u0645\u064A\u0644 \u0648\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639\u0627\u062A',
          '\u063A\u0631\u0641\u0629 \u0633\u0627\u0648\u0646\u0627',
          '\u062D\u0645\u0627\u0645 \u0627\u0644\u0633\u0628\u0627\u062D\u0629',
          '\u0625\u063A\u0644\u0627\u0642 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0646\u0642\u0644 \u0627\u0644\u0639\u0627\u0645',
          '\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0637\u0628\u062E \u0647\u064A\u0626\u0629 \u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0645\u064A\u0627\u0647 \u062F\u0628\u064A \u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0644\u0646\u0642\u0644 \u0644\u0644\u0645\u0643\u0627\u062A\u0628',
          '\u0641\u064A\u0644\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u062C\u062F\u062F\u0629 \u0645\u0624\u062E\u0631\u064B\u0627',
          '\u062A\u0634\u0637\u064A\u0628\u0627\u062A \u0641\u0627\u062E\u0631\u0629',
          '\u0645\u0648\u0642\u0639 \u0639\u0638\u064A\u0645',
          '\u0627\u0644\u0645\u0646\u0627\u0638\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0627\u0644\u062C\u0645\u064A\u0644\u0629 \u0648\u0627\u0644\u062D\u062F\u064A\u0642\u0629',
          '\u062E\u062F\u0645\u0629 \u0627\u0644\u0623\u0645\u0646 \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629 24 \u00D7 7',
          '\u0635\u0627\u0644\u0629 \u0623\u0644\u0639\u0627\u0628 \u0631\u064A\u0627\u0636\u064A\u0629 \u062F\u0627\u062E\u0644\u064A\u0629 \u0645\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A',
          '\u0645\u0637\u0628\u062E \u0645\u0641\u0631\u0648\u0634 \u0648\u062E\u0627\u0631\u062C\u064A',
          '\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0635',
          '',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locationFeatureAR: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0625\u0637\u0627\u0631 \u062F\u0628\u064A',
          '\u062D\u062F\u064A\u0642\u0629 \u0632\u0639\u0628\u064A\u0644',
          '\u062E\u0648\u0631 \u062F\u0628\u064A',
          '\u0648\u0627\u064A \u0641\u0627\u064A \u0645\u0648\u0644',
          '\u062F\u0628\u064A \u062C\u0627\u0631\u062F\u0646 \u062C\u0644\u0648',
          '\u0645\u0631\u0643\u0632 \u062F\u0628\u064A \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A (DWTC)',
          '\u0627\u0644\u0633\u064A\u0641',
          '\u0628\u0631\u062C \u0627\u0644\u0639\u0631\u0628',
          '\u0634\u0627\u0637\u0626 \u062C\u0645\u064A\u0631\u0627',
          '\u0646\u062E\u0644\u0629 \u062C\u0645\u064A\u0631\u0627',
          '\u0645\u062F\u064A\u0646\u0629 \u062C\u0645\u064A\u0631\u0627',
          '\u062D\u062F\u064A\u0642\u0629 \u0648\u0627\u064A\u0644\u062F \u0648\u0627\u062F\u064A \u0627\u0644\u0645\u0627\u0626\u064A\u0629',
          '\u0645\u0633\u062C\u062F \u062C\u0645\u064A\u0631\u0627',
          '\u0645\u0631\u0643\u0632 \u062A\u0633\u0648\u0642 \u0645\u064A\u0631\u0643\u0627\u062A\u0648',
          '\u0633\u064A\u062A\u064A \u0648\u0648\u0643',
          '\u0628\u0648\u0643\u0633 \u0628\u0627\u0631\u0643',
          '\u0642\u0646\u0627\u0629 \u062F\u0628\u064A',
          '\u0633\u0648\u0642 \u062F\u064A\u0631\u0629 \u0644\u0644\u0630\u0647\u0628',
          '\u0633\u0648\u0642 \u0627\u0644\u062A\u0648\u0627\u0628\u0644',
          '\u0633\u0648\u0642 \u0646\u0627\u064A\u0641',
          '\u0639\u0628\u0631\u0629',
          '\u0627\u0644\u0641\u0647\u064A\u062F\u064A \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u064A\u0629',
          '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 (\u0627\u0644\u0628\u0633\u062A\u0643\u064A\u0629)',
          '\u062F\u0628\u064A \u0633\u0641\u0627\u0631\u064A',
          '\u0628\u062D\u064A\u0631\u0627\u062A \u062F\u0628\u064A',
          '\u0633\u0648\u0642 \u0627\u0644\u062A\u0646\u064A\u0646',
          '\u0633\u0648\u0642 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A',
          '\u0645\u062D\u0645\u064A\u0629 \u0631\u0623\u0633 \u0627\u0644\u062E\u0648\u0631 \u0644\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0628\u0631\u064A\u0629',
          '\u0645\u064A\u062F\u0627\u0646\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062B\u0642\u0627\u0641\u064A\u0629',
          '\u062F\u0628\u064A \u062C\u0627\u0631\u062F\u0646 \u062C\u0644\u0648',
          '\u062D\u062F\u064A\u0642\u0629 \u062E\u0648\u0631 \u062F\u0628\u064A',
          '\u062F\u0628\u064A \u0623\u0648\u0628\u0631\u0627',
          '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0628\u0633\u062A\u0643\u064A\u0629 \u0644\u0644\u0641\u0646\u0648\u0646',
          '\u0645\u0637\u0627\u0639\u0645 \u0648\u0645\u0642\u0627\u0647\u064A',
          ''
        ]
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    idSlug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    communitie: Attribute.Enumeration<['true', 'false']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'false'>;
    proShortName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::residential-project.residential-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::residential-project.residential-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::residential-project.residential-project',
      'oneToMany',
      'api::residential-project.residential-project'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTermsAndConditionTermsAndCondition
  extends Schema.CollectionType {
  collectionName: 'terms_and_conditions';
  info: {
    singularName: 'terms-and-condition';
    pluralName: 'terms-and-conditions';
    displayName: 'Terms & Condition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToMany',
      'api::terms-and-condition.terms-and-condition'
    >;
    locale: Attribute.String;
  };
}

export interface ApiUpcomingUpcoming extends Schema.CollectionType {
  collectionName: 'upcomings';
  info: {
    singularName: 'upcoming';
    pluralName: 'upcomings';
    displayName: 'upcoming';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    hero: Attribute.Component<'upcoming-section.hero', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projects: Attribute.DynamicZone<['upcoming-section.all-upcoming']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::upcoming.upcoming',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::upcoming.upcoming',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::upcoming.upcoming',
      'oneToMany',
      'api::upcoming.upcoming'
    >;
    locale: Attribute.String;
  };
}

export interface ApiVideoGalleryVideoGallery extends Schema.CollectionType {
  collectionName: 'video_galleries';
  info: {
    singularName: 'video-gallery';
    pluralName: 'video-galleries';
    displayName: 'videoGallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    hero: Attribute.Component<'video-gallery-section.hero-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    links: Attribute.Component<'video-gallery-section.video-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::video-gallery.video-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::video-gallery.video-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::video-gallery.video-gallery',
      'oneToMany',
      'api::video-gallery.video-gallery'
    >;
    locale: Attribute.String;
  };
}

export interface ApiWhistleblowingWhistleblowing extends Schema.CollectionType {
  collectionName: 'whistleblowings';
  info: {
    singularName: 'whistleblowing';
    pluralName: 'whistleblowings';
    displayName: 'Whistleblowing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::whistleblowing.whistleblowing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::whistleblowing.whistleblowing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::whistleblowing.whistleblowing',
      'oneToMany',
      'api::whistleblowing.whistleblowing'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::all-news.all-news': ApiAllNewsAllNews;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-section.blog-section': ApiBlogSectionBlogSection;
      'api::commercial-project.commercial-project': ApiCommercialProjectCommercialProject;
      'api::contact-us-form.contact-us-form': ApiContactUsFormContactUsForm;
      'api::contect-us.contect-us': ApiContectUsContectUs;
      'api::faq.faq': ApiFaqFaq;
      'api::filter.filter': ApiFilterFilter;
      'api::footer.footer': ApiFooterFooter;
      'api::global.global': ApiGlobalGlobal;
      'api::home.home': ApiHomeHome;
      'api::information-security.information-security': ApiInformationSecurityInformationSecurity;
      'api::media-nav.media-nav': ApiMediaNavMediaNav;
      'api::navbar.navbar': ApiNavbarNavbar;
      'api::news-and-press.news-and-press': ApiNewsAndPressNewsAndPress;
      'api::photo-gallery.photo-gallery': ApiPhotoGalleryPhotoGallery;
      'api::post.post': ApiPostPost;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::propertie.propertie': ApiPropertiePropertie;
      'api::register-form.register-form': ApiRegisterFormRegisterForm;
      'api::register-label.register-label': ApiRegisterLabelRegisterLabel;
      'api::rental-term.rental-term': ApiRentalTermRentalTerm;
      'api::residential-project.residential-project': ApiResidentialProjectResidentialProject;
      'api::terms-and-condition.terms-and-condition': ApiTermsAndConditionTermsAndCondition;
      'api::upcoming.upcoming': ApiUpcomingUpcoming;
      'api::video-gallery.video-gallery': ApiVideoGalleryVideoGallery;
      'api::whistleblowing.whistleblowing': ApiWhistleblowingWhistleblowing;
    }
  }
}

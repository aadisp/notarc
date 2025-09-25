<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u770983604_pYU0u' );

/** Database username */
define( 'DB_USER', 'u770983604_WHOgZ' );

/** Database password */
define( 'DB_PASSWORD', '6cmIFroIlt' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '-fW/c7axp&Z}aO0Qj2m!4wD&lei?LoMP?2%O;:rF-cxN5!?D/)#X_$IHBJ/34B$5' );
define( 'SECURE_AUTH_KEY',   '}jlx&=yFOi5/GnFa`0|ZwMmwl:tq/ak)+}?@*s/]O!yvf<hUQ>enhAIb3M1)lEWx' );
define( 'LOGGED_IN_KEY',     'L^;H<bJ4*]!CRDA.dR/QG=i|N_A79`_XuKp+5WYzU++D).:_QEqxv;Q/BQ5WY2`0' );
define( 'NONCE_KEY',         '=;&ig.f|48>iatMOQm_3.e$Zoa@E^g6{T{69^_tGkrP^]64=?bp:,:[E3xiE#sXI' );
define( 'AUTH_SALT',         ';l=.(`D8qC?Iz(?0Q#bEn*zYoX3:O}mNgU)>axj7lD^*W&vWQIX~)4Asbt 7LUT6' );
define( 'SECURE_AUTH_SALT',  '*q)7t-d_1`H1l`=mD^F0-v^|HVvVD2~Mt!QVL+&zB_4l>:NC&58iuZ% 47ng,XP)' );
define( 'LOGGED_IN_SALT',    'lH{:Nw)A}A^^q$^4i(a^3k@wdgexw{4=Un.y*kMIc]jO[tR2&rbw=veAWCa_^qOd' );
define( 'NONCE_SALT',        '_G-7U@)ryBx.]f.xcRC4qx+F%@9bo7(2yJV:Ml<z,/mU$3d975exeTCDV$z>AP3 ' );
define( 'WP_CACHE_KEY_SALT', 'pIo+4*q[U=-ErS9_S?4MFR7z/Am0HoHN1J0Tr3[t?q7l!#Ny;:| :Y+`%.[t tqi' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', 'bd5ac8b907eb99a032eea54c2fe6949f' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

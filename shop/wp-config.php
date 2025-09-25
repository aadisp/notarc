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
define( 'DB_NAME', 'u770983604_oMrJC' );

/** Database username */
define( 'DB_USER', 'u770983604_lQYDG' );

/** Database password */
define( 'DB_PASSWORD', '1V8gd9wPrL' );

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
define( 'AUTH_KEY',          'APuue7wMo1jv[nr}b8rc&llvTKC$ce5b{Utgo![8alJbm$w!U6Sp/U&/~QNkYg@ ' );
define( 'SECURE_AUTH_KEY',   '~Ps@r>F0]9+HH;Se}CGge|muF2y@U{pQ&@,vXOx#R$vW)(}9m5pK+hh0r, v*7R;' );
define( 'LOGGED_IN_KEY',     '2S !!Y j)9 3Ii|!^~szyQA7uSr;x? E5`T41vs#qRC+/.c7DMu:hv<J/n-BBKHW' );
define( 'NONCE_KEY',         'Y]@{1O hK@%G}uBZ4!-u6-:`oxYEQQp#EA]C8&h&~9(-XUo^~()G5djq}dh(*F.!' );
define( 'AUTH_SALT',         'K?4]12ZMpLi58BfC#t%gQh,szO1!VYtei]Vx^p*(L*S_gxooQYbJ1xXPl!)fY)tH' );
define( 'SECURE_AUTH_SALT',  '~dP8Z8.^ w7;5D-+/d%m#d-sgsI_$W= NY}DNJ!5@a@xtK~{pa56ZZ^u>-@be)V_' );
define( 'LOGGED_IN_SALT',    'cb{;{ZSGIx_@PJNxSDEveM-[UN0=V+a(}8*~Y?4w8PLO>v5/l5]YS2G=k7.]KJ0G' );
define( 'NONCE_SALT',        '~%EKw{?}-Qe;JU<8NQt@nW/lF;_/jXWj<Djtuc21*kjq@%FOwPLkfmJTkOArFx4!' );
define( 'WP_CACHE_KEY_SALT', 'L0g)Kty3/JCxg5Jf0JH0+<,yn08m0#Y#bEx%X0;@qICw-lvkVKbI3;f(1:}3(i!v' );


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
define( 'COOKIEHASH', '9c8f111a7719ba53addea4d7740a6233' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

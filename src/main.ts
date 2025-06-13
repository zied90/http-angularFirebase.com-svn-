Trying to pull ***.azurecr.io/factory/build/linux/node:18-ubi9...
Getting image source signatures
Copying blob sha256:c45cb5216bf7cb492daf0f5f75bd5b6efe4b9078b81dca5101d6cb8fdc12f4db
Copying blob sha256:d84eb033f2d589e2b4180ce9117ad4400bc315ee08d69e78ff4010622b615163
Copying blob sha256:eaa15b97d123a5c72c53d4c7ea0cc41163c40bd54f6830da4d1a6de0555550d1
Copying blob sha256:c45cb5216bf7cb492daf0f5f75bd5b6efe4b9078b81dca5101d6cb8fdc12f4db
Copying blob sha256:eaa15b97d123a5c72c53d4c7ea0cc41163c40bd54f6830da4d1a6de0555550d1
Copying blob sha256:d84eb033f2d589e2b4180ce9117ad4400bc315ee08d69e78ff4010622b615163
Copying config sha256:1ecc373bf004d5fc56e0f187e9cbf9bc843647020acbf0b0b9309d02d1e3eb3a
Writing manifest to image destination
Storing signatures
[1/2] STEP 2/6: WORKDIR ${APP_ROOT}
[1/2] STEP 3/6: COPY --chown=${USER} ["./package*.json", "./"]
[1/2] STEP 4/6: RUN npm ci
npm warn reify invalid or damaged lockfile detected
npm warn reify please re-try this operation once it completes
npm warn reify so that the damage can be corrected, or perform
npm warn reify a fresh install with no lockfile if the problem persists.
npm error code 1
npm error path /opt/app-root/node_modules/sharp
npm error command failed
npm error command sh -c (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)
npm error sharp: Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.13.3/libvips-8.13.3-linux-x64.tar.br
npm error sharp: Via proxy http:://10.142.22.37:8080 no credentials
npm error sharp: Integrity check passed for linux-x64
npm error prebuild-install warn install tunneling socket could not be established, statusCode=403
npm error gyp info it worked if it ends with ok
npm error gyp info using node-gyp@8.4.1
npm error gyp info using node@18.20.6 | linux | x64
npm error gyp info find Python using Python version 3.9.21 found at "/usr/bin/python3"
npm error gyp http GET https://nodejs.org/download/release/v18.20.6/node-v18.20.6-headers.tar.gz
npm error gyp http 200 https://nodejs.org/download/release/v18.20.6/node-v18.20.6-headers.tar.gz
npm error gyp http GET https://nodejs.org/download/release/v18.20.6/SHASUMS256.txt
npm error gyp http 200 https://nodejs.org/download/release/v18.20.6/SHASUMS256.txt
npm error gyp info spawn /usr/bin/python3
npm error gyp info spawn args [
npm error gyp info spawn args   '/opt/app-root/node_modules/node-gyp/gyp/gyp_main.py',
npm error gyp info spawn args   'binding.gyp',
npm error gyp info spawn args   '-f',
npm error gyp info spawn args   'make',
npm error gyp info spawn args   '-I',
npm error gyp info spawn args   '/opt/app-root/node_modules/sharp/build/config.gypi',
npm error gyp info spawn args   '-I',
npm error gyp info spawn args   '/opt/app-root/node_modules/node-gyp/addon.gypi',
npm error gyp info spawn args   '-I',

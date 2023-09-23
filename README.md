# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Running a dev agent
### Running in docker

```bash
docker run -p 8001:8001 -p 8080:8080 -it valory/open-autonomy-user:0.10.7
export AGENT_HASH=bafybeicrsaulxhbw7h3o4vh5yyy5pr6s3vxhrxd76enoxs3rngfwkk2uha
aea fetch $AGENT_HASH --alias agent
cd agent
export LOG_FILE="log.txt"
export LOG_DIR="."
aea -s generate-key ethereum && aea -s add-key ethereum && \
aea -s install && \
aea -s run
```


building.

It is bery difficult to do so in linux.

Advised to do so within a docker container

```
apt-get install libsoup-3.0 
	libjavascriptcoregtk-4.1-dev
	webkit2gtk-4.1
	android-sdk
```
export ANDROID_HOME=/usr/lib/android-sdk
export NDK_HOME=/workdir/deps/android-ndk-r26

cd ANDROID_HOME
wget --quiet --output-document=tools.zip https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
unzip -qq tools.zip
echo y | tools/bin/sdkmanager "platforms;android-25"
echo y | tools/bin/sdkmanager "platform-tools"
echo y | tools/bin/sdkmanager "build-tools;25.0.2"
echo y | tools/bin/sdkmanager "extras;android;m2repository"
echo y | tools/bin/sdkmanager "extras;google;m2repository"

```

need a load of android stuff

https://jdk.java.net/archive/

java 11 seems to do the trick.

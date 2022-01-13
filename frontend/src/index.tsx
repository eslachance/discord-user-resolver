import { customElement, hot } from 'solid-element';
import { Show, Match, Switch, onMount, createSignal } from 'solid-js';
import { create, cssomSheet } from 'twind';

type FetchedUser = {
  id?: string;
  system?: null;
  locale?: null;
  flags?: number;
  username?: string;
  bot?: boolean;
  discriminator?: string;
  avatar?: string;
  lastMessageChannelID?: null;
  createdTimestamp?: number;
  defaultAvatarURL?: string;
  tag: string;
  avatarURL?: string;
  displayAvatarURL?: string;
};

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'discord-user': any;
    }
  }
}

type PropTypes = {
  type: string,
  user: string,
}

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

customElement(
  'discord-user',
  { type: 'simple', user: '' } as PropTypes,
  (props: PropTypes, { element }) => {
    const [userData, setUserData] = createSignal<FetchedUser>();
    let inputtype = '';
    let inputvalue = '';
    if(props.user.indexOf(":") > -1) {
      [inputtype, inputvalue] = props.user.split(':');
    } else {
      inputtype = 'id';
      inputvalue = props.user;
    }

    onMount(() => {
      element.shadowRoot.adoptedStyleSheets = [sheet.target];
      if (inputvalue) {
        fetch(
          `https://discord-user-lookup.herokuapp.com/user/${inputvalue}`,
          { mode: 'cors' },
        )
          .then((res) => res.json())
          .then((data) => setUserData(data))
          .catch((error) => {
            setUserData({
              tag: 'Error fetching...',
            });
          });
      }
    });

    return (
      <Show when={userData()} fallback={<div>loading...</div>}>
        <Switch>
          <Match when={props.type === 'simple'}>
            <span
              class={tw`rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center ease w-max`}
            >
              <img
                class={tw`rounded-full w-9 h-9 max-w-none`}
                alt={userData()!.tag}
                src={userData()!.avatarURL}
              />
              <span class={tw`flex items-center px-3 py-2`}>
                {userData()!.tag}
              </span>
            </span>
          </Match>
          <Match when={props.type === 'text'}>
            <span>{userData()!.tag}</span>
          </Match>
        </Switch>
      </Show>
    );
  },
);

if (import.meta.hot) {
  import.meta.hot.accept();
  hot(import.meta as any, 'discord-user');
}

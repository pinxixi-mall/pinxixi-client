import { createApp } from 'vue'
import { DefineComponent } from 'vue'
import {
  Button,
  Image,
  Form,
  Field,
  Search,
  Icon,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Skeleton,
  Grid,
  GridItem,
  NavBar,
  Toast,
  Dialog,
  Sticky,
  PullRefresh,
  Loading,
  Sidebar,
  SidebarItem,
  TreeSelect,
  Card,
  Tag,
  Uploader
} from 'vant'
const comps = [
  Button,
  Image,
  Form,
  Field,
  Search,
  Icon,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Skeleton,
  Grid,
  GridItem,
  NavBar,
  Toast,
  Dialog,
  Sticky,
  PullRefresh,
  Loading,
  Sidebar,
  SidebarItem,
  TreeSelect,
  Card,
  Tag,
  Uploader 
]

export default {
  install: function (app: DefineComponent) {
    comps.forEach((comp) => app.component(comp.name, comp))
  }
}

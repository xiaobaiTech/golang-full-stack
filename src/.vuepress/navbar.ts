import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // {
  //   text: 'Golang',
  //   // 这里是下拉列表展现形式。
  //   items: [
  //     {
  //       text: '学习路线',
  //       link: '/golang/学习路线'
  //     }, {
  //       text: '基础面试题',
  //       link: '/golang/面试题/1.Go入门'
  //     },{
  //       text: '进阶面试题',
  //       link: '/golang/面试题/2.Go进阶'
  //     }
  //   ]
  // },
  {
    text: "训练营",
    icon: "campground",
    prefix: "/训练营/",
    children: [
      {
        text: "介绍",
        icon: "address-card",
        link: '/训练营/介绍'
      },
      {
        text: "入营须知",
        icon: "brain",
        link: '/训练营/入营须知'
      },
    ],
  },
  {
    text: "计算机基础",
    icon: "computer",
    prefix: "/计算机基础/",
    children: [
      {
        text: "操作系统",
        icon: "server",
        link: '/计算机基础/操作系统/'
      },
      {
        text: "网络基础",
        icon: "wifi",
        link: '/计算机基础/网络基础/'
      },
    ],
  },
  {
    text: "架构",
    icon: "folder-tree",
    prefix: "/架构/",
    children: [
      {
        text: "云原生",
        icon: "box",
        link: '/架构/云原生/'
      },
      {
        text: "分布式",
        icon: "manat-sign",
        link: '/架构/分布式/'
      },
      {
        text: "微服务",
        icon: "microchip",
        link: '/架构/微服务/'
      },
      {
        text: "运维",
        icon: "folder-open",
        link: '/架构/运维/'
      },
    ],
  },
  {
    text: "中间件",
    icon: "align-center",
    prefix: "/中间件/",
    children: [
      {
        text: "ES",
        icon: "magnifying-glass",
        link: '/中间件/es/'
      },
      {
        text: "Kafka",
        icon: "chess-queen",
        link: '/中间件/kafka/'
      },
      {
        text: "Memcached",
        icon: "suitcase",
        link: '/中间件/Memcached/'
      },
      {
        text: "ClickHouse",
        icon: "house-laptop",
        link: '/中间件/ClickHouse/'
      },
      {
        text: "Mongodb",
        icon: "vr-cardboard",
        link: '/中间件/mongodb/'
      },
      {
        text: "Mysql",
        icon: "database",
        link: '/中间件/mysql/'
      },
      {
        text: "Nginx",
        icon: "network-wired",
        link: '/中间件/nginx/'
      },
      {
        text: "RabbitMQ",
        icon: "frog",
        link: '/中间件/rabbitmq/'
      },
      {
        text: "Redis",
        icon: "registered",
        link: '/中间件/redis/'
      },
      {
        text: "RocketMQ",
        icon: "rocket",
        link: '/中间件/rocketmq/'
      },
      {
        text: "Hadoop",
        icon: "hdd",
        link: '/中间件/hadoop/'
      },
    ],
  },
  {
    text: "Golang",
    icon: "lightbulb",
    prefix: "/golang/",
    children: [
      {
        text: "学习路线",
        icon: "map-location-dot",
        prefix: "学习路线",
        link: '/golang/学习路线'
      },
      {
        text: "常用包大全",
        icon: "book",
        prefix: "常用包大全",
        link: '/golang/常用包大全'
      },
      {
        text: "核心知识点",
        icon: "house-laptop",
        link: '/golang/核心知识点/'
      },
      {
        text: "基础面试题",
        icon: "disease",
        link: '/golang/面试题/1.Go入门'
      },
      {
        text: "进阶面试题",
        icon: "clipboard-question",
        link: '/golang/面试题/2.Go进阶'
      }
    ],
  },
  {
    text: "blog",
    icon: "book",
    link: "https://xiaobaidebug.top/",
  },
  {
    text: "sitemap",
    icon: "blog",
    link: "https://golangguide.top/sitemap.xml",
  },
]);

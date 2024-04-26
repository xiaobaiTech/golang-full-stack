import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r,o as d,c as t,a as e,b as i,d as a,e as n}from"./app-DwpWJ2P8.js";const c={},o=n(`<h1 id="分布式面试题" tabindex="-1"><a class="header-anchor" href="#分布式面试题"><span><strong>分布式面试题</strong></span></a></h1><h2 id="分布式服务接口的幂等性如何设计" tabindex="-1"><a class="header-anchor" href="#分布式服务接口的幂等性如何设计"><span>分布式服务接口的幂等性如何设计？</span></a></h2><p>所谓幂等性，就是说一个接口，多次发起同一个请求，你这个接口得保证结果是准确得。比如不能多扣款。不能多插入一条数据，不能将统计值多加了1，这就是幂等性。</p><p>其实保证幂等性主要是三点：</p><ul><li>对于每个请求必须有一个唯一的标识，举个例子：订单支付请求，肯定得包含订单 ID，一个订单 ID最多支付一次。</li><li>每次处理完请求之后，必须有一个记录标识这个请求处理过了，比如说常见得方案是再 mysql 中记录个状态啥得，比如支付之前记录一条这个订单得支付流水，而且支付流水采用 order id 作为唯一键（unique key）。只有成功插入这个支付流水，才可以执行实际得支付扣款</li><li>每次接收请求需要进行判断之前是否处理过得逻辑处理，比如说，如果有一个订单已经支付了，就已经有了一条支付流水，那么如果重复发送这个请求，则此时先插入支付流水，order id 已经存在了，唯一键约束生效，报错插入不进去得。然后你就不用再扣款了。</li></ul><h2 id="分布式系统中的接口调用如何保证顺序性" tabindex="-1"><a class="header-anchor" href="#分布式系统中的接口调用如何保证顺序性"><span>分布式系统中的接口调用如何保证顺序性？</span></a></h2><p>可以接入 MQ，如果是系统 A使用多线程处理的话，可以使用内存队列，来保证顺序性，如果你要100%的顺序性，当然可以使用分布式锁来搞，会影响系统的并发性。</p><h2 id="分布式锁实现原理-用过吗" tabindex="-1"><a class="header-anchor" href="#分布式锁实现原理-用过吗"><span>分布式锁实现原理，用过吗？</span></a></h2><p>在分析分布式锁的三种实现方式之前，先了解一下分布式锁应该具备哪些条件：</p><ol><li>在分布式系统环境下，一个方法在同一时间只能被一个机器的一个线程执行；</li><li>高可用的获取锁与释放锁；</li><li>高性能的获取锁与释放锁；</li><li>具备可重入特性；</li><li>具备锁失效机制，防止死锁；</li><li>具备非阻塞锁特性，即没有获取到锁将直接返回获取锁失败。</li></ol><p>分布式的CAP理论告诉我们“任何一个分布式系统都无法同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance），最多只能同时满足两项。”所以，很多系统在设计之初就要对这三者做出取舍。在互联网领域的绝大多数的场景中，都需要牺牲强一致性来换取系统的高可用性，系统往往只需要保证“最终一致性”，只要这个最终时间是在用户可以接受的范围内即可。</p><p>通常分布式锁以单独的服务方式实现，目前比较常用的分布式锁实现有三种：</p><ul><li>基于数据库实现分布式锁。</li><li>基于缓存（redis，memcached，tair）实现分布式锁。</li><li>基于Zookeeper实现分布式锁。</li></ul><p>尽管有这三种方案，但是不同的业务也要根据自己的情况进行选型，他们之间没有最好只有更适合！</p><ul><li>基于数据库的实现方式</li></ul><p>基于数据库的实现方式的核心思想是：在数据库中创建一个表，表中包含方法名等字段，并在方法名字段上创建唯一索引，想要执行某个方法，就使用这个方法名向表中插入数据，成功插入则获取锁，执行完成后删除对应的行数据释放锁。</p><p>创建一个表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DROP TABLE IF EXISTS \`method_lock\`;
CREATE TABLE \`method_lock\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39;主键&#39;,
  \`method_name\` varchar(64) NOT NULL COMMENT &#39;锁定的方法名&#39;,
  \`desc\` varchar(255) NOT NULL COMMENT &#39;备注信息&#39;,
  \`update_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uidx_method_name\` (\`method_name\`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT=&#39;锁定中的方法&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想要执行某个方法，就使用这个方法名向表中插入数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>INSERT INTO method_lock (method_name, desc) VALUES (&#39;methodName&#39;, &#39;测试的methodName&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为我们对method_name做了唯一性约束，这里如果有多个请求同时提交到数据库的话，数据库会保证只有一个操作可以成功，那么我们就可以认为操作成功的那个线程获得了该方法的锁，可以执行方法体内容。</p><p>成功插入则获取锁，执行完成后删除对应的行数据释放锁：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>delete from method_lock where method_name =&#39;methodName&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：这里只是使用基于数据库的一种方法，使用数据库实现分布式锁还有很多其他的用法可以实现！</p><p>使用基于数据库的这种实现方式很简单，但是对于分布式锁应该具备的条件来说，它有一些问题需要解决及优化：</p><p>1、因为是基于数据库实现的，数据库的可用性和性能将直接影响分布式锁的可用性及性能，所以，数据库需要双机部署、数据同步、主备切换；</p><p>2、不具备可重入的特性，因为同一个线程在释放锁之前，行数据一直存在，无法再次成功插入数据，所以，需要在表中新增一列，用于记录当前获取到锁的机器和线程信息，在再次获取锁的时候，先查询表中机器和线程信息是否和当前机器和线程相同，若相同则直接获取锁；</p><p>3、没有锁失效机制，因为有可能出现成功插入数据后，服务器宕机了，对应的数据没有被删除，当服务恢复后一直获取不到锁，所以，需要在表中新增一列，用于记录失效时间，并且需要有定时任务清除这些失效的数据；</p><p>4、不具备阻塞锁特性，获取不到锁直接返回失败，所以需要优化获取逻辑，循环多次去获取。</p><p>5、在实施的过程中会遇到各种不同的问题，为了解决这些问题，实现方式将会越来越复杂；依赖数据库需要一定的资源开销，性能问题需要考虑。</p><ul><li>基于Redis的实现方式</li></ul><p>选用Redis实现分布式锁原因：</p><ol><li>Redis有很高的性能；</li><li>Redis命令对此支持较好，实现起来比较方便</li></ol><p>主要实现方式:</p><ol><li>SET lock currentTime+expireTime EX 600 NX，使用set设置lock值，并设置过期时间为600秒，如果成功，则获取锁；</li><li>获取锁后，如果该节点掉线，则到过期时间ock值自动失效；</li><li>释放锁时，使用del删除lock键值；</li></ol><p>使用redis单机来做分布式锁服务，可能会出现单点问题，导致服务可用性差，因此在服务稳定性要求高的场合，官方建议使用redis集群（例如5台，成功请求锁超过3台就认为获取锁），来实现redis分布式锁。详见RedLock。</p><p>优点:性能高，redis可持久化，也能保证数据不易丢失,redis集群方式提高稳定性。</p><p>缺点:使用redis主从切换时可能丢失部分数据。</p><ul><li>基于ZooKeeper的实现方式</li></ul><p>ZooKeeper是一个为分布式应用提供一致性服务的开源组件，它内部是一个分层的文件系统目录树结构，规定同一个目录下只能有一个唯一文件名。基于ZooKeeper实现分布式锁的步骤如下：</p><ol><li>创建一个目录mylock；</li><li>线程A想获取锁就在mylock目录下创建临时顺序节点；</li><li>获取mylock目录下所有的子节点，然后获取比自己小的兄弟节点，如果不存在，则说明当前线程顺序号最小，获得锁；</li><li>线程B获取所有节点，判断自己不是最小节点，设置监听比自己次小的节点；</li><li>线程A处理完，删除自己的节点，线程B监听到变更事件，判断自己是不是最小的节点，如果是则获得锁。</li></ol><p>这里推荐一个Apache的开源库Curator，它是一个ZooKeeper客户端，Curator提供的InterProcessMutex是分布式锁的实现，acquire方法用于获取锁，release方法用于释放锁。</p><p>优点：具备高可用、可重入、阻塞锁特性，可解决失效死锁问题。</p><p>缺点：因为需要频繁的创建和删除节点，性能上不如Redis方式。</p><p>上面的三种实现方式，没有在所有场合都是完美的，所以，应根据不同的应用场景选择最适合的实现方式。</p><p>在分布式环境中，对资源进行上锁有时候是很重要的，比如抢购某一资源，这时候使用分布式锁就可以很好地控制资源。</p><h2 id="etcd怎么实现分布式锁" tabindex="-1"><a class="header-anchor" href="#etcd怎么实现分布式锁"><span>Etcd怎么实现分布式锁?</span></a></h2><p>首先思考下Etcd是什么？可能很多人第一反应可能是一个键值存储仓库，却没有重视官方定义的后半句，用于配置共享和服务发现。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>A highly-available key value store for shared configuration and service discovery.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上，etcd 作为一个受到 ZooKeeper 与 doozer 启发而催生的项目，除了拥有与之类似的功能外，更专注于以下四点。</p><ul><li>简单：基于 HTTP+JSON 的 API 让你用 curl 就可以轻松使用。</li><li>安全：可选 SSL 客户认证机制。</li><li>快速：每个实例每秒支持一千次写操作。</li><li>可信：使用 Raft 算法充分实现了分布式。</li></ul><p>但是这里我们主要讲述Etcd如何实现分布式锁?</p><p>因为 Etcd 使用 Raft 算法保持了数据的强一致性，某次操作存储到集群中的值必然是全局一致的，所以很容易实现分布式锁。锁服务有两种使用方式，一是保持独占，二是控制时序。</p><ul><li>保持独占即所有获取锁的用户最终只有一个可以得到。etcd 为此提供了一套实现分布式锁原子操作 CAS（CompareAndSwap）的 API。通过设置prevExist值，可以保证在多个节点同时去创建某个目录时，只有一个成功。而创建成功的用户就可以认为是获得了锁。</li><li>控制时序，即所有想要获得锁的用户都会被安排执行，但是获得锁的顺序也是全局唯一的，同时决定了执行顺序。etcd 为此也提供了一套 API（自动创建有序键），对一个目录建值时指定为POST动作，这样 etcd 会自动在目录下生成一个当前最大的值为键，存储这个新的值（客户端编号）。同时还可以使用 API 按顺序列出所有当前目录下的键值。此时这些键的值就是客户端的时序，而这些键中存储的值可以是代表客户端的编号。</li></ul><p>在这里Ectd实现分布式锁基本实现原理为：</p><ol><li>在ectd系统里创建一个key</li><li>如果创建失败，key存在，则监听该key的变化事件，直到该key被删除，回到1</li><li>如果创建成功，则认为我获得了锁</li></ol><p>应用示例:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>package etcdsync

import (
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;os&quot;
    &quot;sync&quot;
    &quot;time&quot;

    &quot;github.com/coreos/etcd/client&quot;
    &quot;github.com/coreos/etcd/Godeps/_workspace/src/golang.org/x/net/context&quot;
)

const (
    defaultTTL = 60
    defaultTry = 3
    deleteAction = &quot;delete&quot;
    expireAction = &quot;expire&quot;
)

// A Mutex is a mutual exclusion lock which is distributed across a cluster.
type Mutex struct {
    key    string
    id     string // The identity of the caller
    client client.Client
    kapi   client.KeysAPI
    ctx    context.Context
    ttl    time.Duration
    mutex  *sync.Mutex
    logger io.Writer
}

// New creates a Mutex with the given key which must be the same
// across the cluster nodes.
// machines are the ectd cluster addresses
func New(key string, ttl int, machines []string) *Mutex {
    cfg := client.Config{
        Endpoints:               machines,
        Transport:               client.DefaultTransport,
        HeaderTimeoutPerRequest: time.Second,
    }

    c, err := client.New(cfg)
    if err != nil {
        return nil
    }

    hostname, err := os.Hostname()
    if err != nil {
        return nil
    }

    if len(key) == 0 || len(machines) == 0 {
        return nil
    }

    if key[0] != &#39;/&#39; {
        key = &quot;/&quot; + key
    }

    if ttl &lt; 1 {
        ttl = defaultTTL
    }

    return &amp;Mutex{
        key:    key,
        id:     fmt.Sprintf(&quot;%v-%v-%v&quot;, hostname, os.Getpid(), time.Now().Format(&quot;20060102-15:04:05.999999999&quot;)),
        client: c,
        kapi:   client.NewKeysAPI(c),
        ctx: context.TODO(),
        ttl: time.Second * time.Duration(ttl),
        mutex:  new(sync.Mutex),
    }
}

// Lock locks m.
// If the lock is already in use, the calling goroutine
// blocks until the mutex is available.
func (m *Mutex) Lock() (err error) {
    m.mutex.Lock()
    for try := 1; try &lt;= defaultTry; try++ {
        if m.lock() == nil {
            return nil
        }
        
        m.debug(&quot;Lock node %v ERROR %v&quot;, m.key, err)
        if try &lt; defaultTry {
            m.debug(&quot;Try to lock node %v again&quot;, m.key, err)
        }
    }
    return err
}

func (m *Mutex) lock() (err error) {
    m.debug(&quot;Trying to create a node : key=%v&quot;, m.key)
    setOptions := &amp;client.SetOptions{
        PrevExist:client.PrevNoExist,
        TTL:      m.ttl,
    }
    resp, err := m.kapi.Set(m.ctx, m.key, m.id, setOptions)
    if err == nil {
        m.debug(&quot;Create node %v OK [%q]&quot;, m.key, resp)
        return nil
    }
    m.debug(&quot;Create node %v failed [%v]&quot;, m.key, err)
    e, ok := err.(client.Error)
    if !ok {
        return err
    }

    if e.Code != client.ErrorCodeNodeExist {
        return err
    }

    // Get the already node&#39;s value.
    resp, err = m.kapi.Get(m.ctx, m.key, nil)
    if err != nil {
        return err
    }
    m.debug(&quot;Get node %v OK&quot;, m.key)
    watcherOptions := &amp;client.WatcherOptions{
        AfterIndex : resp.Index,
        Recursive:false,
    }
    watcher := m.kapi.Watcher(m.key, watcherOptions)
    for {
        m.debug(&quot;Watching %v ...&quot;, m.key)
        resp, err = watcher.Next(m.ctx)
        if err != nil {
            return err
        }

        m.debug(&quot;Received an event : %q&quot;, resp)
        if resp.Action == deleteAction || resp.Action == expireAction {
            return nil
        }
    }

}

// Unlock unlocks m.
// It is a run-time error if m is not locked on entry to Unlock.
//
// A locked Mutex is not associated with a particular goroutine.
// It is allowed for one goroutine to lock a Mutex and then
// arrange for another goroutine to unlock it.
func (m *Mutex) Unlock() (err error) {
    defer m.mutex.Unlock()
    for i := 1; i &lt;= defaultTry; i++ {
        var resp *client.Response
        resp, err = m.kapi.Delete(m.ctx, m.key, nil)
        if err == nil {
            m.debug(&quot;Delete %v OK&quot;, m.key)
            return nil
        }
        m.debug(&quot;Delete %v falied: %q&quot;, m.key, resp)
        e, ok := err.(client.Error)
        if ok &amp;&amp; e.Code == client.ErrorCodeKeyNotFound {
            return nil
        }
    }
    return err
}

func (m *Mutex) debug(format string, v ...interface{}) {
    if m.logger != nil {
        m.logger.Write([]byte(m.id))
        m.logger.Write([]byte(&quot; &quot;))
        m.logger.Write([]byte(fmt.Sprintf(format, v...)))
        m.logger.Write([]byte(&quot;\\n&quot;))
    }
}

func (m *Mutex) SetDebugLogger(w io.Writer) {
    m.logger = w
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实类似的实现有很多，但目前都已经过时，使用的都是被官方标记为deprecated的项目。且大部分接口都不如上述代码简单。 使用上，跟Golang官方sync包的Mutex接口非常类似，先New()，然后调用Lock()，使用完后调用Unlock()，就三个接口，就是这么简单。示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>package main

import (
    &quot;github.com/zieckey/etcdsync&quot;
    &quot;log&quot;
)

func main() {
    //etcdsync.SetDebug(true)
    log.SetFlags(log.Ldate|log.Ltime|log.Lshortfile)
    m := etcdsync.New(&quot;/etcdsync&quot;, &quot;123&quot;, []string{&quot;http://127.0.0.1:2379&quot;})
    if m == nil {
        log.Printf(&quot;etcdsync.NewMutex failed&quot;)
    }
    err := m.Lock()
    if err != nil {
        log.Printf(&quot;etcdsync.Lock failed&quot;)
    } else {
        log.Printf(&quot;etcdsync.Lock OK&quot;)
    }

    log.Printf(&quot;Get the lock. Do something here.&quot;)

    err = m.Unlock()
    if err != nil {
        log.Printf(&quot;etcdsync.Unlock failed&quot;)
    } else {
        log.Printf(&quot;etcdsync.Unlock OK&quot;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说说-zookeeper-一般都有哪些使用场景" tabindex="-1"><a class="header-anchor" href="#说说-zookeeper-一般都有哪些使用场景"><span>说说 ZooKeeper 一般都有哪些使用场景？</span></a></h2><ul><li>分布式协调：这个其实就是 zk 很经典的一个用法，简单来说，就好比，你系统 A发送个请求到 mq，然后 B消费了之后处理。那 A系统如何指导 B系统的处理结果？用 zk 就可以实现分布式系统之间的协调工作。A系统发送请求之后可以在 zk 上对某个节点的值注册个监听器，一旦 B系统处理完了就修改 zk 那个节点的值，A立马就可以收到通知，完美解决。</li><li>分布所锁：对某一个数据联系发出两个修改操作，两台机器同时收到请求，但是只能一台机器先执行另外一个机器再执行，那么此时就可以使用 zk 分布式锁，一个机器接收到了请求之后先获取 zk 上的一把分布式锁，就是可以去创建一个 znode，接着执行操作，然后另外一个机器也尝试去创建那个 znode，结果发现自己创建不了，因为被别人创建了，那只能等着，等等一个机器执行完了自己再执行。</li><li>配置信息管理：zk 可以用作很多系统的配置信息的管理，比如 kafka，</li></ul><p>storm 等等很多分布式系统都会选用 zk 来做一些元数据，配置信息的管理，包括 dubbo 注册中心不也支持 zk 么。</p><ul><li>HA高可用性：这个应该是很常见的，比如 hdfs，yarn 等很多大数据系统，都选择基于 zk 来开发 HA高可用机制，就是一个重要进程一般会主备两个，主进程挂了立马通过 zk 感知到切换到备份进程。</li></ul><h2 id="说说你们的分布式-session-方案是啥-怎么做的" tabindex="-1"><a class="header-anchor" href="#说说你们的分布式-session-方案是啥-怎么做的"><span>说说你们的分布式 session 方案是啥？怎么做的？</span></a></h2><ul><li>Tomcat + redis</li></ul><p>其实还挺方便的，就是使用 session 的代码跟以前一样，还是基于 tomcat 原生的 session 支持即可，然后就是用一个叫做 tomcat RedisSessionManager 的东西，让我们部署的 tomcat 都将 session 数据存储到 redis 即可.</p><ul><li>Spring Session + redis</li></ul><p>分布式会话的这个东西重耦合在 tomcat，如果我要将 web容器迁移成 jetty，不能重新把 jetty 都配置一遍.</p><p>所以现在比较好用的还是基于 java 的一站式解决方案，使用 spring session 是一个很好的选择，给 spring session 配置基于 redis 来存储 session 数据，然后配置一个 spring session 的过滤器，这样的话，session 相关操作都会交</p><p>给 spring session 来管了。接着在代码中，就是用原生的 session 操作，就是直接基于 spring session 从 redis 中获取数据了。</p><h2 id="分布式事务了解吗" tabindex="-1"><a class="header-anchor" href="#分布式事务了解吗"><span>分布式事务了解吗？</span></a></h2><ul><li>XA方案/两阶段提交方案</li></ul><p>第一个阶段（先询问）</p><p>第二个阶段（再执行）</p><ul><li>TCC方案</li></ul><p>TCC的全程是：Try、Confirm、Cancel 这个其实是用到了补偿的概念，分为了三个阶段</p><p>Try 阶段：这个阶段说的是对各个服务的资源做检测以及对资源进行锁定或者预留</p><p>Confirm 阶段：这个阶段说的是在各个服务中执行实际的操作</p><p>Cancel 阶段：如果任何一个服务的业务方法执行出错，那么这里就需要进行补偿，就是执行已经成功的业务逻辑的回滚操作</p><ul><li>本地消息表</li><li>可靠消息最终一致性方案</li><li>最大努力通知方案</li></ul><h2 id="那常见的分布式锁有哪些解决方案" tabindex="-1"><a class="header-anchor" href="#那常见的分布式锁有哪些解决方案"><span>那常见的分布式锁有哪些解决方案？</span></a></h2><ul><li>Reids 的分布式锁，很多大公司会基于 Reidis 做扩展开发</li><li>基于 Zookeeper</li><li>基于数据库，比如 Mysql</li></ul><h2 id="zk-和-redis-的区别-各自有什么优缺点" tabindex="-1"><a class="header-anchor" href="#zk-和-redis-的区别-各自有什么优缺点"><span>ZK 和 Redis 的区别，各自有什么优缺点？</span></a></h2><p><strong>先说 Redis</strong>：</p><ul><li>Redis 只保证最终一致性，副本间的数据复制是异步进行（Set 是写，Get 是读，Reids 集群一般是读写分离架构，存在主从同步延迟情况），主从切换之后可能有部分数据没有复制过去可能会丢失锁情况，故强一致性要求的业务不推荐使用 Reids，推荐使用 zk。</li><li>Redis 集群各方法的响应时间均为最低。随着并发量和业务数量的提升其响应时间会有明显上升（公有集群影响因素偏大），但是极限 qps 可以达到最大且基本无异常。</li></ul><p><strong>再说 ZK</strong>：</p><ul><li>使用 ZooKeeper 集群，锁原理是使用 ZooKeeper 的临时节点，临时节点的生命周期在 Client 与集群的 Session 结束时结束。因此如果某个 Client 节点存在网络问题，与 ZooKeeper 集群断开连接，Session 超时同样会导致锁被错误的释放（导致被其他线程错误地持有），因此 ZooKeeper 也无法保证完全一致。</li><li>ZK具有较好的稳定性；响应时间抖动很小，没有出现异常。但是随着并发量和业务数量的提升其响应时间和 qps 会明显下降。</li></ul><h2 id="mysql-如何做分布式锁" tabindex="-1"><a class="header-anchor" href="#mysql-如何做分布式锁"><span>MySQL 如何做分布式锁？</span></a></h2><p><strong>方法一</strong>：</p><p>利用 Mysql 的锁表，创建一张表，设置一个 UNIQUE KEY 这个 KEY 就是要锁的 KEY，所以同一个 KEY 在 mysql 表里只能插入一次了，这样对锁的竞争就交给了数据库，处理同一个 KEY 数据库保证了只有一个节点能插入成功，其他节点都会插入失败。</p><p>DB分布式锁的实现：通过主键 id 的唯一性进行加锁，说白了就是加锁的形式是向一张表中插入一条数据，该条数据的 id 就是一把分布式锁，例如当一次请求插入了一条 id 为1 的数据，其他想要进行插入数据的并发请求必须等第一次请求执行完成后删除这条 id 为1 的数据才能继续插入，实现了分布式锁的功能。</p><p><strong>方法二</strong>：</p><p>使用流水号+时间戳做幂等操作，可以看作是一个不会释放的锁。</p><h2 id="你了解业界哪些大公司的分布式锁框架" tabindex="-1"><a class="header-anchor" href="#你了解业界哪些大公司的分布式锁框架"><span>你了解业界哪些大公司的分布式锁框架</span></a></h2><ul><li><h2 id="google-chubby" tabindex="-1"><a class="header-anchor" href="#google-chubby"><span><strong>Google:Chubby</strong></span></a></h2></li></ul><p>Chubby是一套分布式协调系统，内部使用 Paxos 协调 Master 与 Replicas。 Chubby lock service 被应用在 GFS, BigTable 等项目中，其首要设计目标是高可靠性，而不是高性能。</p><p>Chubby被作为粗粒度锁使用，例如被用于选主。持有锁的时间跨度一般为小时或天，而不是秒级。</p><p>Chubby对外提供类似于文件系统的 API，在 Chubby创建文件路径即加锁操作。 Chubby使用 Delay 和 SequenceNumber来优化锁机制。Delay 保证客户端异常释放锁时，Chubby仍认为该客户端一直持有锁。Sequence number 指锁的持有者向 Chubby服务端请求一个序号（包括几个属性），然后之后在需要使用锁的时候将该序号一并发给 Chubby 服务器，服务端检查序号的合法性，包括 number 是否有效等。</p><ul><li><h2 id="京东-sharklock" tabindex="-1"><a class="header-anchor" href="#京东-sharklock"><span>**京东 SharkLock **</span></a></h2></li></ul><p>SharkLock 是基于 Redis 实现的分布式锁。锁的排他性由 SETNX原语实现，使用 timeout 与续租机制实现锁的强制释放。</p><ul><li><h2 id="蚂蚁金服-sofajraft-rheakv-分布式锁" tabindex="-1"><a class="header-anchor" href="#蚂蚁金服-sofajraft-rheakv-分布式锁"><span><strong>蚂蚁金服 SOFAJRaft-RheaKV 分布式锁</strong></span></a></h2></li></ul><p>RheaKV 是基于 SOFAJRaft 和 RocksDB 实现的嵌入式、分布式、高可用、强一致的 KV 存储类库。</p><p>RheaKV对外提供 lock 接口，为了优化数据的读写，按不同的存储类型，提供不同的锁特性。RheaKV提供 wathcdog 调度器来控制锁的自动续租机制，避免锁在任务完成前提前释放，和锁永不释放造成死锁。</p><ul><li><h2 id="netflix-curator" tabindex="-1"><a class="header-anchor" href="#netflix-curator"><span><strong>Netflix: Curator</strong></span></a></h2></li></ul><p>Curator 是 ZooKeeper 的客户端封装，其分布式锁的实现完全由 ZooKeeper 完成。</p><p>在 ZooKeeper 创建 EPHEMERAL_SEQUENTIAL节点视为加锁，节点的 EPHEMERAL特性保证了锁持有者与 ZooKeeper 断开时强制释放锁；节点的 SEQUENTIAL特性避免了加锁较多时的惊群效应。</p><h2 id="请讲一下你对-cap-理论的理解" tabindex="-1"><a class="header-anchor" href="#请讲一下你对-cap-理论的理解"><span>请讲一下你对 CAP 理论的理解</span></a></h2><p>在理论计算机科学中，CAP定理（CAP theorem），又被称作布鲁尔定理</p><ul><li>Brewer’s theorem），它指出对于一个分布式计算系统来说，不可能同时满足以下三点：</li><li>Consistency（一致性）指数据在多个副本之间能够保持一致的特性（严格的一致性）</li><li>Availability（可用性）指系统提供的服务必须一直处于可用的状态，每次请求都能获取到非错的响应（不保证获取的数据为最新数据）</li><li>Partition tolerance（分区容错性）分布式系统在遇到任何网络分区故障的时候，仍然能够对外提供满足一致性和可用性的服务，除非整个网络环境都发生了故障</li></ul><p>Spring Cloud 在 CAP法则上主要满足的是 A和 P法则，Dubbo和 Zookeeper 在 CAP法则主要满足的是 C和 P法则。</p><p>CAP仅适用于原子读写的 NOSQL场景中，并不适合数据库系统。现在的分布式系统具有更多特性比如扩展性、可用性等等，在进行系统设计和开发时，我们不应该仅仅局限在 CAP问题上。现实生活中，大部分人解释这一定律时，常常简单的表述为：“一致性、可用性、分区容忍性三者你只能同时达到其中两个，不可能同时达到”。实际上这是一个非常具有误导性质的说法，而且在 CAP理论诞生12 年之后，CAP之父也在2012 年重写了之前的论文。当发生网络分区的时候，如果我们要继续服务，那么强一致性和可用性只能2 选1。也就是说当网络分区之后 P是前提，决定了 P之后才有 C和 A的选择。也就是说分区容错性（Partition tolerance）我们是必须要实现的。</p><h2 id="请讲一下你对-base-理论的理解" tabindex="-1"><a class="header-anchor" href="#请讲一下你对-base-理论的理解"><span>请讲一下你对 BASE 理论的理解</span></a></h2><p>BASE理论由 eBay架构师 Dan Pritchett 提出，在2008 年上被分表为论文，并且 eBay给出了他们在实践中总结的基于 BASE理论的一套新的分布式事务解决方案。</p><p>BASE 是 Basically Available（基本可用）、Soft-state（软状态）和 Eventually Consistent（最终一致性）三个短语的缩写。BASE理论是对 CAP 中一致性和可用性权衡的结果，其来源于对大规模互联网系统分布式实践的总结，是基于 CAP定理逐步演化而来的，它大大降低了我们对系统的要求。 BASE理论的核心思想是即使无法做到强一致性，但每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。也就是牺牲数据的一致性来满足系统的高可用性，系统中一部分数据不可用或者不一致时，仍需要保持系统整体“主要可用”。</p><p>针对数据库领域，BASE思想的主要实现是对业务数据进行拆分，让不同的数据分布在不同的机器上，以提升系统的可用性，当前主要有以下两种做法：</p><ul><li>按功能划分数据库</li><li>分片（如开源的 Mycat、Amoeba等）。</li></ul><h2 id="分布式与集群的区别是什么" tabindex="-1"><a class="header-anchor" href="#分布式与集群的区别是什么"><span>分布式与集群的区别是什么？</span></a></h2><p>分布式：一个业务分拆多个子业务，部署在不同的服务器上集群：同一个业务，部署在多个服务器上。比如之前做电商网站搭的 redis 集群以及 solr 集群都是属于将 redis 服务器提供的缓存服务以及 solr 服务器提供的搜索服务部署在多个服务器上以提高系统性能、并发量解决海量存储问</p><p>题。</p><h2 id="请讲一下-base-理论的三要素" tabindex="-1"><a class="header-anchor" href="#请讲一下-base-理论的三要素"><span>请讲一下 BASE 理论的三要素</span></a></h2><p><strong>基本可用</strong></p><p>基本可用是指分布式系统在出现不可预知故障的时候，允许损失部分可用性。但是，这绝不等价于系统不可用。</p><p>比如：</p><ul><li>响应时间上的损失：正常情况下，一个在线搜索引擎需要在0.5 秒之内返回给用户相应的查询结果，但由于出现故障，查询结果的响应时间增加了1~2秒</li><li>系统功能上的损失：正常情况下，在一个电子商务网站上进行购物的时候，消费者几乎能够顺利完成每一笔订单，但是在一些节日大促购物高峰的时候，由于消费者的购物行为激增，为了保护购物系统的稳定性，部分消费者可能会被引导到一个降级页面</li></ul><p><strong>软状态</strong></p><p>软状态指允许系统中的数据存在中间状态，并认为该中间状态的存在不会影响系统的整体可用性，即允许系统在不同节点的数据副本之间进行数据同步的过程存在延时。</p><p><strong>最终一致性</strong>强调的是系统中所有的数据副本，在经过一段时间的同步后，最终能够达到一个一致的状态。因此，最终一致性的本质是需要系统保证最终数据能够达到一致，而不需要实时保证系统数据的强一致性。</p><h2 id="请说一下对两阶段提交协议的理解" tabindex="-1"><a class="header-anchor" href="#请说一下对两阶段提交协议的理解"><span>请说一下对两阶段提交协议的理解</span></a></h2><p>分布式系统的一个难点是如何保证架构下多个节点在进行事务性操作的时候保持一致性。为实现这个目的，二阶段提交算法的成立基于以下假设：</p>`,130),u=e("li",null,"该分布式系统中，存在一个节点作为协调者(Coordinator)，其他节点作为参与者(Cohorts)。且节点之间可以进行网络通信。",-1),v={href:"https://cloud.tencent.com/solution/cloudlog?from=10680",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,[i("所有节点不会永久性损坏，即使损坏后仍然可以恢复。## "),e("strong",null,"第一阶段（投票阶段）")],-1),p=e("li",null,"协调者节点向所有参与者节点询问是否可以执行提交操作(vote)，并开始等待各参与者节点的响应。",-1),b=e("li",null,"参与者节点执行询问发起为止的所有事务操作，并将 Undo信息和 Redo信息写入日志。（注意：若成功这里其实每个参与者已经执行了事务操作）",-1),h=e("li",null,"各参与者节点响应协调者节点发起的询问。如果参与者节点的事务操作实际执行成功，则它返回一个”同意”消息；如果参与者节点的事务操作实际执行失败，则它返回一个”中止”消息。",-1),g=n('<p>**第二阶段（提交执行阶段）**当协调者节点从所有参与者节点获得的相应消息都为”同意”：</p><ul><li>协调者节点向所有参与者节点发出”正式提交(commit)”的请求。</li><li>参与者节点正式完成操作，并释放在整个事务期间内占用的资源。</li><li>参与者节点向协调者节点发送”完成”消息。</li><li>协调者节点受到所有参与者节点反馈的”完成”消息后，完成事务。如果任一参与者节点在第一阶段返回的响应消息为”中止”：</li><li>协调者节点向所有参与者节点发出”回滚操作(rollback)”的请求。</li><li>参与者节点利用之前写入的 Undo信息执行回滚，并释放在整个事务期间内占用的资源。</li><li>参与者节点向协调者节点发送”回滚完成”消息。</li><li>协调者节点受到所有参与者节点反馈的”回滚完成”消息后，取消事务。</li></ul><h2 id="请讲一下对-tcc-协议的理解" tabindex="-1"><a class="header-anchor" href="#请讲一下对-tcc-协议的理解"><span>请讲一下对 TCC 协议的理解</span></a></h2><p>Try Confirm Cancel</p><ul><li>Try：尝试待执行的业务，这个过程并未执行业务，只是完成所有业务的一致性检查，并预留好执行所需的全部资源。</li><li>Confirm：执行业务，这个过程真正开始执行业务，由于 Try 阶段已经完成了一致性检查，因此本过程直接执行，而不做任何检查。并且在执行的过程中，会使用到 Try 阶段预留的业务资源。</li><li>Cancel：取消执行的业务，若业务执行失败，则进入 Cancel 阶段，它会释放所有占用的业务资源，并回滚 Confirm 阶段执行的操作。</li></ul>',5);function k(y,f){const l=r("ExternalLinkIcon");return d(),t("div",null,[o,e("ul",null,[u,e("li",null,[i("所有节点都采用预写式日志，且日志被写入后即被保持在可靠的存储设备上，即使节点损坏不会导致日志数据"),e("a",v,[i("的消失。"),a(l)])]),m,p,b,h]),g])}const A=s(c,[["render",k],["__file","面试题.html.vue"]]),q=JSON.parse('{"path":"/%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F/%E9%9D%A2%E8%AF%95%E9%A2%98.html","title":"分布式面试题","lang":"zh-CN","frontmatter":{"description":"分布式面试题 分布式服务接口的幂等性如何设计？ 所谓幂等性，就是说一个接口，多次发起同一个请求，你这个接口得保证结果是准确得。比如不能多扣款。不能多插入一条数据，不能将统计值多加了1，这就是幂等性。 其实保证幂等性主要是三点： 对于每个请求必须有一个唯一的标识，举个例子：订单支付请求，肯定得包含订单 ID，一个订单 ID最多支付一次。 每次处理完请求之...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"分布式面试题"}],["meta",{"property":"og:description","content":"分布式面试题 分布式服务接口的幂等性如何设计？ 所谓幂等性，就是说一个接口，多次发起同一个请求，你这个接口得保证结果是准确得。比如不能多扣款。不能多插入一条数据，不能将统计值多加了1，这就是幂等性。 其实保证幂等性主要是三点： 对于每个请求必须有一个唯一的标识，举个例子：订单支付请求，肯定得包含订单 ID，一个订单 ID最多支付一次。 每次处理完请求之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-08T00:58:04.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-04-08T00:58:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式面试题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-08T00:58:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"分布式面试题"}],["meta",{"property":"og:description","content":"分布式面试题 分布式服务接口的幂等性如何设计？ 所谓幂等性，就是说一个接口，多次发起同一个请求，你这个接口得保证结果是准确得。比如不能多扣款。不能多插入一条数据，不能将统计值多加了1，这就是幂等性。 其实保证幂等性主要是三点： 对于每个请求必须有一个唯一的标识，举个例子：订单支付请求，肯定得包含订单 ID，一个订单 ID最多支付一次。 每次处理完请求之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-08T00:58:04.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-08T00:58:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式面试题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-08T00:58:04.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分布式服务接口的幂等性如何设计？","slug":"分布式服务接口的幂等性如何设计","link":"#分布式服务接口的幂等性如何设计","children":[]},{"level":2,"title":"分布式系统中的接口调用如何保证顺序性？","slug":"分布式系统中的接口调用如何保证顺序性","link":"#分布式系统中的接口调用如何保证顺序性","children":[]},{"level":2,"title":"分布式锁实现原理，用过吗？","slug":"分布式锁实现原理-用过吗","link":"#分布式锁实现原理-用过吗","children":[]},{"level":2,"title":"Etcd怎么实现分布式锁?","slug":"etcd怎么实现分布式锁","link":"#etcd怎么实现分布式锁","children":[]},{"level":2,"title":"说说 ZooKeeper 一般都有哪些使用场景？","slug":"说说-zookeeper-一般都有哪些使用场景","link":"#说说-zookeeper-一般都有哪些使用场景","children":[]},{"level":2,"title":"说说你们的分布式 session 方案是啥？怎么做的？","slug":"说说你们的分布式-session-方案是啥-怎么做的","link":"#说说你们的分布式-session-方案是啥-怎么做的","children":[]},{"level":2,"title":"分布式事务了解吗？","slug":"分布式事务了解吗","link":"#分布式事务了解吗","children":[]},{"level":2,"title":"那常见的分布式锁有哪些解决方案？","slug":"那常见的分布式锁有哪些解决方案","link":"#那常见的分布式锁有哪些解决方案","children":[]},{"level":2,"title":"ZK 和 Redis 的区别，各自有什么优缺点？","slug":"zk-和-redis-的区别-各自有什么优缺点","link":"#zk-和-redis-的区别-各自有什么优缺点","children":[]},{"level":2,"title":"MySQL 如何做分布式锁？","slug":"mysql-如何做分布式锁","link":"#mysql-如何做分布式锁","children":[]},{"level":2,"title":"你了解业界哪些大公司的分布式锁框架","slug":"你了解业界哪些大公司的分布式锁框架","link":"#你了解业界哪些大公司的分布式锁框架","children":[]},{"level":2,"title":"请讲一下你对 CAP 理论的理解","slug":"请讲一下你对-cap-理论的理解","link":"#请讲一下你对-cap-理论的理解","children":[]},{"level":2,"title":"请讲一下你对 BASE 理论的理解","slug":"请讲一下你对-base-理论的理解","link":"#请讲一下你对-base-理论的理解","children":[]},{"level":2,"title":"分布式与集群的区别是什么？","slug":"分布式与集群的区别是什么","link":"#分布式与集群的区别是什么","children":[]},{"level":2,"title":"请讲一下 BASE 理论的三要素","slug":"请讲一下-base-理论的三要素","link":"#请讲一下-base-理论的三要素","children":[]},{"level":2,"title":"请说一下对两阶段提交协议的理解","slug":"请说一下对两阶段提交协议的理解","link":"#请说一下对两阶段提交协议的理解","children":[]},{"level":2,"title":"请讲一下对 TCC 协议的理解","slug":"请讲一下对-tcc-协议的理解","link":"#请讲一下对-tcc-协议的理解","children":[]}],"git":{"createdTime":1707812321000,"updatedTime":1712537884000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2},{"name":"xiaobai-tech","email":"948485496@qq.com","commits":1}]},"readingTime":{"minutes":25.64,"words":7693},"filePathRelative":"架构/分布式/面试题.md","localizedDate":"2024年2月13日","autoDesc":true}');export{A as comp,q as data};

import fs from 'fs';

const rawText = `Keterampilan	Artikel / Dokumentasi Resmi (URL)	Video Tutorial (Platform / URL)
JavaScript	MDN JavaScript Guide (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)	FreeCodeCamp JS Course (https://www.youtube.com/watch?v=PkZNo7MFOUg)
TypeScript	TypeScript Official Handbook (https://www.typescriptlang.org/docs/)	Programming with Mosh TS (https://www.youtube.com/watch?v=d56mG7DezGs)
Python	Python 3 Official Tutorial (https://docs.python.org/3/tutorial/index.html)	FreeCodeCamp Python (https://www.youtube.com/watch?v=eWRfhZUzrAc)
C++	CPlusPlus.com Tutorial (https://cplusplus.com/doc/tutorial/)	FreeCodeCamp C++ (https://www.youtube.com/watch?v=vLnPwxZdW4Y)
C#	Microsoft Learn C# (https://learn.microsoft.com/en-us/dotnet/csharp/)	FreeCodeCamp C# (https://www.youtube.com/watch?v=GhQdlIFylQ8)
Java	Oracle Java Tutorials (https://docs.oracle.com/javase/tutorial/)	Programming with Mosh Java (https://www.youtube.com/watch?v=eIrMbAQSU34)
Go (Golang)	Effective Go (https://go.dev/doc/effective_go)	FreeCodeCamp Go (https://www.youtube.com/watch?v=YS4e4q9oBaU)
Rust	The Rust Programming Book (https://doc.rust-lang.org/book/)	Traversy Media Rust (https://www.youtube.com/watch?v=zF34dRivLOw)
PHP	PHP Official Manual (https://www.php.net/manual/en/)	FreeCodeCamp PHP (https://www.youtube.com/watch?v=OK_JCtrrv-c)
Ruby	Ruby in 20 Minutes (https://www.ruby-lang.org/en/documentation/quickstart/)	FreeCodeCamp Ruby (https://www.youtube.com/watch?v=t_ispmWmdjY)
Swift	Swift.org Documentation (https://www.swift.org/documentation/)	FreeCodeCamp Swift (https://www.youtube.com/watch?v=comQ1-x2a1Q)
Kotlin	Kotlin Getting Started (https://kotlinlang.org/docs/getting-started.html)	FreeCodeCamp Kotlin (https://www.youtube.com/watch?v=F9UC9tjQ3j0)
Dart	Dart Language Tour (https://dart.dev/language)	FreeCodeCamp Dart (https://www.youtube.com/watch?v=Ej_Pcr4uC2Q)
HTML5	MDN HTML Structuring (https://developer.mozilla.org/en-US/docs/Learn/HTML)	FreeCodeCamp HTML (https://www.youtube.com/watch?v=pQN-pnXPaVg)
CSS3	MDN CSS Basics (https://developer.mozilla.org/en-US/docs/Learn/CSS)	FreeCodeCamp CSS (https://www.youtube.com/watch?v=1Rs2ND1ryYc)
React.js	React.dev Quick Start (https://react.dev/learn)	FreeCodeCamp React (https://www.youtube.com/watch?v=bMknfKXIFA8)
Next.js	Next.js Official Docs (https://nextjs.org/docs)	FreeCodeCamp Next.js (https://www.youtube.com/watch?v=wm5gMKuwSYk)
Vue.js	Vue.js Introduction (https://vuejs.org/guide/introduction.html)	FreeCodeCamp Vue (https://www.youtube.com/watch?v=FXpIoQ_rT_c)
Nuxt.js	Nuxt 4 Documentation (https://nuxt.com/docs/4.x)	Traversy Media Nuxt (https://www.youtube.com/watch?v=RhZZ0whiuT8)
Angular	Angular Getting Started (https://angular.io/start)	FreeCodeCamp Angular (https://www.youtube.com/watch?v=3qBXWUpoPHo)
Svelte	Svelte Official Tutorial (https://svelte.dev/tutorial)	Traversy Media Svelte (https://www.youtube.com/watch?v=3TVy6GdtNuQ)
Laravel	Laravel Deployment (https://laravel.com/docs)	Traversy Media Laravel (https://www.youtube.com/watch?v=MFh0Fd7BsjE)
Spring Boot	Spring Boot Reference (https://spring.io/projects/spring-boot)	FreeCodeCamp Spring Boot (https://www.youtube.com/watch?v=vtPkZShrvXQ)
Django	Django Official Docs (https://docs.djangoproject.com/en/stable/)	Programming with Mosh Django (https://www.youtube.com/watch?v=rHux0gMZ3Eg)
Flask	Flask Quickstart (https://flask.palletsprojects.com/en/stable/quickstart/)	FreeCodeCamp Flask (https://www.youtube.com/watch?v=Z1RJmh_OqeA)
Express.js	Express Starter Guide (https://expressjs.com/en/starter/installing.html)	Traversy Media Express (https://www.youtube.com/watch?v=L72fhGm1tfE)
NestJS	NestJS Fundamentals (https://docs.nestjs.com/)	Traversy Media NestJS (https://www.youtube.com/watch?v=GHTA143_b-s)
Tailwind CSS	Tailwind Core Concepts (https://tailwindcss.com/docs/utility-first)	FreeCodeCamp Tailwind (https://www.youtube.com/watch?v=ft30zcMlFao)
Bootstrap	Bootstrap Docs (https://getbootstrap.com/docs/5.3/getting-started/introduction/)	FreeCodeCamp Bootstrap (https://www.youtube.com/watch?v=-qfEOE4vtxE)
Sass/SCSS	Sass Basics (https://sass-lang.com/guide)	FreeCodeCamp Sass (https://www.youtube.com/watch?v=_a5j7KoflTs)
React Native	React Native Docs (https://reactnative.dev/docs/getting-started)	Programming with Mosh RN (https://www.youtube.com/watch?v=0-S5a0eXPoc)
Flutter	Flutter Official Docs (https://docs.flutter.dev/)	FreeCodeCamp Flutter (https://www.youtube.com/watch?v=VPvVD8t02U8)
Node.js	Node.js Getting Started (https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)	Programming with Mosh Node (https://www.youtube.com/watch?v=TlB_eWDSMt4)
Deno	Deno Official Manual (https://docs.deno.com/)	Traversy Media Deno (https://www.youtube.com/watch?v=NHHhiqwcfRM)
GraphQL	GraphQL Introduction (https://graphql.org/learn/)	FreeCodeCamp GraphQL (https://www.youtube.com/watch?v=ed8SzALpx1Q)
Apollo Client	Apollo Client React (https://www.apollographql.com/docs/react/)	Web Dev Simplified Apollo (https://www.youtube.com/watch?v=YyUWW04HNcw)
Redux	Redux Core Concepts (https://redux.js.org/tutorials/fundamentals/part-1-overview)	FreeCodeCamp Redux (https://www.youtube.com/watch?v=zrs7u6bdbUw)
Zustand	Zustand GitHub Docs (https://zustand-demo.pmnd.rs/)	Web Dev Simplified Zustand (https://www.youtube.com/watch?v=_VqZNjaTXE)
jQuery	jQuery Core Docs (https://learn.jquery.com/)	Traversy Media jQuery (https://www.youtube.com/watch?v=3nrLocccHxs)
SQL	W3Schools SQL Tutorial (https://www.w3schools.com/sql/)	FreeCodeCamp SQL (https://www.youtube.com/watch?v=HXV3zeQKqGY)
PL/SQL	Oracle PL/SQL Guide (https://docs.oracle.com/cd/B19306_01/appdev.102/b14261/toc.htm)	ProgrammingKnowledge PL/SQL (https://www.youtube.com/watch?v=1F_E1w-P4-A)
Bash/Shell Scripting	GNU Bash Reference (https://www.gnu.org/software/bash/manual/)	FreeCodeCamp Bash (https://www.youtube.com/watch?v=tK9Oc6AEnxc)
PowerShell	Microsoft PowerShell Docs (https://learn.microsoft.com/en-us/powershell/)	FreeCodeCamp PowerShell (https://www.youtube.com/watch?v=UVUd9_k9C6A)
Ruby on Rails	Active Record Basics (https://guides.rubyonrails.org/active_record_basics.html)	Traversy Media Rails (https://www.youtube.com/watch?v=B3Fbpc8EEqw)
ASP.NET Core	Microsoft ASP.NET Docs (https://learn.microsoft.com/en-us/aspnet/core/)	FreeCodeCamp ASP.NET (https://www.youtube.com/watch?v=hZ1DASYd9rk)
FastAPI	FastAPI SQL Databases (https://fastapi.tiangolo.com/tutorial/sql-databases/)	FreeCodeCamp FastAPI (https://www.youtube.com/watch?v=0sOvCWFmrtA)
Prisma ORM	Prisma Introduction (https://www.prisma.io/docs)	Web Dev Simplified Prisma (https://www.youtube.com/watch?v=RebA5J-rlwg)
Sequelize	Sequelize Getting Started (https://sequelize.org/docs/v6/getting-started/)	Traversy Media Sequelize (https://www.youtube.com/watch?v=qsDvJrGMSINw)
Mongoose	Mongoose Quick Start (https://mongoosejs.com/docs/index.html)	Web Dev Simplified Mongoose (https://www.youtube.com/watch?v=DZBGEVgL2eE)
Eloquent ORM	Laravel Eloquent Docs (https://laravel.com/docs/eloquent)	Traversy Media Eloquent (https://www.youtube.com/watch?v=vHt2LC1EM3Q)
Git	Pro Git Book (https://git-scm.com/book/en/v2)	FreeCodeCamp Git (https://www.youtube.com/watch?v=RGOj5yH7evk)
GitHub	GitHub Docs (https://docs.github.com/en)	Traversy Media GitHub (https://www.youtube.com/watch?v=yVTnedU1U-0)
GitLab	GitLab CI/CD Guide (https://docs.gitlab.com/ee/ci/)	TechWorld with Nana GitLab (https://www.youtube.com/watch?v=qP8kilTQOzg)
Docker	Docker Overview (https://docs.docker.com/get-started/)	Programming with Mosh Docker (https://www.youtube.com/watch?v=pTFZFxd4hOI)
Kubernetes	Kubernetes Concepts (https://kubernetes.io/docs/concepts/)	FreeCodeCamp Kubernetes (https://www.youtube.com/watch?v=_4uQI4ihGVU)
AWS EC2	Amazon EC2 Docs (https://docs.aws.amazon.com/ec2/)	FreeCodeCamp AWS EC2 (https://www.youtube.com/watch?v=a9__D53WsUs)
AWS S3	Amazon S3 Docs (https://docs.aws.amazon.com/s3/)	Be A Better Dev AWS S3 (https://www.youtube.com/watch?v=vjTzB3kO-Bw)
AWS Lambda	AWS Lambda Docs (https://docs.aws.amazon.com/lambda/)	FreeCodeCamp AWS Lambda (https://www.youtube.com/watch?v=eOBq__h4OJ4)
Google Cloud Platform (GCP)	GCP Documentation (https://cloud.google.com/docs)	FreeCodeCamp GCP (https://www.youtube.com/watch?v=vReySEUMNV0)
Microsoft Azure	Azure Docs (https://learn.microsoft.com/en-us/azure/)	FreeCodeCamp Azure (https://www.youtube.com/watch?v=NKEFWyqJ5XA)
Terraform	Terraform Introduction (https://developer.hashicorp.com/terraform/intro)	FreeCodeCamp Terraform (https://www.youtube.com/watch?v=7xngnjfIlK4)
Ansible	Ansible Documentation (https://docs.ansible.com/)	TechWorld with Nana Ansible (https://www.youtube.com/watch?v=goclfp6a2IQ)
Jenkins	Jenkins User Docs (https://www.jenkins.io/doc/)	FreeCodeCamp Jenkins (https://www.youtube.com/watch?v=FX322RVNGj4)
GitHub Actions	GitHub Actions Guide (https://docs.github.com/en/actions)	TechWorld with Nana Actions (https://www.youtube.com/watch?v=R8_veQiYBjI)
Vercel	Vercel Deployment Docs (https://vercel.com/docs)	Traversy Media Vercel (https://www.youtube.com/watch?v=85JVKjW-uG0)
Netlify	Netlify Documentation (https://docs.netlify.com/)	Traversy Media Netlify (https://www.youtube.com/watch?v=eB1qH8v7HQQ)
Postman	Postman Learning Center (https://learning.postman.com/docs/)	FreeCodeCamp Postman (https://www.youtube.com/watch?v=VywxIQ2ZXw4)
Insomnia	Kong Insomnia Docs (https://docs.insomnia.rest/)	Kong Insomnia Tutorial (https://www.youtube.com/watch?v=fzLPHpOP3Wc)
Figma	Figma Help Center (https://help.figma.com/hc/en-us)	DesignCourse Figma (https://www.youtube.com/watch?v=4W4LvvnYgGM)
Adobe XD	Adobe XD Tutorials (https://helpx.adobe.com/xd/tutorials.html)	DesignCourse Adobe XD (https://www.youtube.com/watch?v=W0y2Z-EU1E8)
Wireshark	Wireshark User Guide (https://www.wireshark.org/docs/wsug_html_chunked/)	FreeCodeCamp Wireshark (https://www.youtube.com/watch?v=1VmTk2UlpLY)
Metasploit	OffSec Metasploit Unleashed (https://www.offsec.com/metasploit-unleashed/)	HackerSploit Metasploit (https://www.youtube.com/watch?v=8lR27r8Y_ik)
Nmap	Nmap Network Scanning (https://nmap.org/book/)	HackerSploit Nmap (https://www.youtube.com/watch?v=4t4kBkMsDbQ)
Burp Suite	PortSwigger Burp Suite Docs (https://portswigger.net/burp/documentation)	The Cyber Mentor Burp (https://www.youtube.com/watch?v=2_lswM1S264)
Qualys	Qualys Documentation (https://www.qualys.com/documentation/)	TopTechCourses Qualys (https://www.youtube.com/watch?v=Q337Nl8T9D8)
Nessus	Tenable Nessus User Guide (https://docs.tenable.com/nessus/)	NetworkChuck Nessus (https://www.youtube.com/watch?v=pse-ClBW1qU)
Splunk	Splunk Training Free Courses (https://www.splunk.com/en_us/training.html)	FreeCodeCamp Splunk (https://www.youtube.com/watch?v=baFL6FhDknY)
Elasticsearch	Elastic Reference (https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)	Traversy Media Elastic (https://www.youtube.com/watch?v=gQq34p2H1g0)
Logstash	Logstash Reference (https://www.elastic.co/guide/en/logstash/current/index.html)	Simplilearn ELK Stack (https://www.youtube.com/watch?v=0hK27oPrtA4)
Kibana	Kibana Guide (https://www.elastic.co/guide/en/kibana/current/index.html)	TechWorld with Nana Kibana (https://www.youtube.com/watch?v=Vq_O2511-K0)
Prometheus	Prometheus Documentation (https://prometheus.io/docs/introduction/overview/)	TechWorld with Nana Prom (https://www.youtube.com/watch?v=h4Sl21AKiDg)
Grafana	Grafana Docs (https://grafana.com/docs/)	NetworkChuck Grafana (https://www.youtube.com/watch?v=i-_n7ee_u2E)
Datadog	Datadog Documentation (https://docs.datadoghq.com/)	DevOps Directive Datadog (https://www.youtube.com/watch?v=bMKNfKXIFA8)
Jira	Atlassian Jira Guides (https://www.atlassian.com/software/jira/guides)	Simplilearn Jira (https://www.youtube.com/watch?v=vV1kO08xUfs)
Trello	Trello Guide (https://trello.com/guide)	Atlassian Trello (https://www.youtube.com/watch?v=iE1T0oSjBjQ)
Webpack	Webpack Concepts (https://webpack.js.org/concepts/)	Traversy Media Webpack (https://www.youtube.com/watch?v=CPQjK1kbbns)
Vite	Vite Guide (https://vitejs.dev/guide/)	FreeCodeCamp Vite (https://www.youtube.com/watch?v=K1JoQv-FvEw)
npm	npm Documentation (https://docs.npmjs.com/)	Traversy Media npm (https://www.youtube.com/watch?v=jHDhaSSKmB0)
yarn	Yarn Docs (https://classic.yarnpkg.com/en/docs/)	Academind Yarn (https://www.youtube.com/watch?v=g9_6KmiB8Mg)
pnpm	pnpm Motivation (https://pnpm.io/motivation)	Fireship pnpm (https://www.youtube.com/watch?v=RbjE_3ZJtV8)
MySQL	MySQL Reference Manual (https://dev.mysql.com/doc/)	FreeCodeCamp MySQL (https://www.youtube.com/watch?v=HXV3zeQKqGY)
PostgreSQL	PostgreSQL Tutorial (https://www.postgresql.org/docs/current/tutorial.html)	FreeCodeCamp PostgreSQL (https://www.youtube.com/watch?v=qw--VYLpxG4)
MongoDB	MongoDB Manual (https://www.mongodb.com/docs/manual/)	Web Dev Simplified MongoDB (https://www.youtube.com/watch?v=ofme2o29ngU)
Redis	Redis Documentation (https://redis.io/docs/)	Traversy Media Redis (https://www.youtube.com/watch?v=jgpVdJB2sKQ)
Cassandra	Apache Cassandra Docs (https://cassandra.apache.org/doc/latest/)	Simplilearn Cassandra (https://www.youtube.com/watch?v=0bT4RFTy2J4)
Apache Kafka	Apache Kafka Documentation (https://kafka.apache.org/documentation/)	FreeCodeCamp Kafka (https://www.youtube.com/watch?v=Ch5VhJzaoaI)
RabbitMQ	RabbitMQ Tutorials (https://www.rabbitmq.com/getstarted.html)	Fireship RabbitMQ (https://www.youtube.com/watch?v=CjieEOmihZE)
Nginx	Nginx Beginner's Guide (https://nginx.org/en/docs/beginners_guide.html)	FreeCodeCamp Nginx (https://www.youtube.com/watch?v=JKxlsvZXG7c)
Apache HTTP Server	Apache Official Docs (https://httpd.apache.org/docs/)	ProgrammingKnowledge Apache (https://www.youtube.com/watch?v=WxwGgMIti84)
VMware/VirtualBox	Oracle VirtualBox Manual (https://www.virtualbox.org/manual/)	NetworkChuck VirtualBox (https://www.youtube.com/watch?v=wX75Z-4MEoM)
Agile Methodology	Agile Alliance Manifesto (https://agilemanifesto.org/)	Simplilearn Agile (https://www.youtube.com/watch?v=Z9QbYZh1YXY)
Scrum Framework	Scrum Guide (https://scrumguides.org/scrum-guide.html)	FreeCodeCamp Scrum (https://www.youtube.com/watch?v=TRcReyRYIMg)
Kanban	Atlassian Kanban Guide (https://www.atlassian.com/agile/kanban)	Simplilearn Kanban (https://www.youtube.com/watch?v=BjdE6D-D1gI)
System Design	Roadmap.sh System Design (https://roadmap.sh/system-design)	FreeCodeCamp System Design (https://www.youtube.com/watch?v=bBTPHL9NwCQ)
RESTful API Architecture	Microsoft API Design (https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)	FreeCodeCamp REST API (https://www.youtube.com/watch?v=-MTSQjw5DrM)
GraphQL Concepts	GraphQL Introduction (https://graphql.org/learn/)	Fireship GraphQL (https://www.youtube.com/watch?v=eCGsq0cQCEU)
OOP	MDN OOP Concepts (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)	FreeCodeCamp OOP (https://www.youtube.com/watch?v=pTB0EiLXUC8)
Functional Programming	MDN FP Guide (https://developer.mozilla.org/en-US/docs/Glossary/Functional_programming)	FreeCodeCamp FP (https://www.youtube.com/watch?v=e-5obm1G_FY)
Microservices	Martin Fowler Microservices (https://martinfowler.com/articles/microservices.html)	FreeCodeCamp Microservices (https://www.youtube.com/watch?v=oB5ctmEwzG8)
Monolithic Architecture	Atlassian Monolith vs Microservices (https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith)	IBM Technology Monolith (https://www.youtube.com/watch?v=Pj1_3i0K2k4)
Serverless Computing	AWS Serverless Architectures (https://aws.amazon.com/serverless/)	FreeCodeCamp Serverless (https://www.youtube.com/watch?v=vxjobLqB_f0)
TDD	Agile Alliance TDD (https://www.agilealliance.org/glossary/tdd/)	FreeCodeCamp TDD (https://www.youtube.com/watch?v=Jv2uxzhPFl4)
BDD	Cucumber BDD Overview (https://cucumber.io/docs/bdd/)	Simplilearn BDD (https://www.youtube.com/watch?v=4xR8z_U_dUU)
CI/CD Principles	Red Hat CI/CD Guide (https://www.redhat.com/en/topics/devops/what-is-ci-cd)	TechWorld with Nana CI/CD (https://www.youtube.com/watch?v=scEDHlsCECw)
SEO	Google Search Central SEO (https://developers.google.com/search/docs/fundamentals/seo-starter-guide)	FreeCodeCamp SEO (https://www.youtube.com/watch?v=xsVTqzcsb5Q)
WCAG	W3C WCAG Guidelines (https://www.w3.org/WAI/standards-guidelines/wcag/)	Traversy Media WCAG (https://www.youtube.com/watch?v=20BofLku754)
UX Research	NN Group UX Research (https://www.nngroup.com/articles/ux-research-cheat-sheet/)	FreeCodeCamp UX (https://www.youtube.com/watch?v=c9Wg6Cb_YlU)
UI Design Systems	InVision Design Systems (https://xd.adobe.com/ideas/principles/design-systems/)	DesignCourse Design Systems (https://www.youtube.com/watch?v=ZfPBqfXUj3M)
Responsive Web Design	MDN Responsive Design (https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)	FreeCodeCamp RWD (https://www.youtube.com/watch?v=srvUrASNj0s)
State Management	React State Management (https://react.dev/learn/managing-state)	Web Dev Simplified State (https://www.youtube.com/watch?v=-bZAafvGNMA)
DDD	Martin Fowler DDD (https://martinfowler.com/bliki/DomainDrivenDesign.html)	Codecrafters DDD (https://www.youtube.com/watch?v=DqZIxUPx1YU)
MVC Architecture	MDN MVC Concept (https://developer.mozilla.org/en-US/docs/Glossary/MVC)	FreeCodeCamp MVC (https://www.youtube.com/watch?v=DUg2SWWK18I)
SOLID Principles	DigitalOcean SOLID (https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)	FreeCodeCamp SOLID (https://www.youtube.com/watch?v=txZqSZWU9AQ)
DRY & KISS	WorkAt.Tech Design Principles (https://workat.tech/machine-coding/tutorial/software-design-principles-dry-yagni-eytrxfhz1fla)	Programming with Mosh Clean Code (https://www.youtube.com/watch?v=UjhX2sVf0eg)
Git Flow	Atlassian Git Flow (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)	FreeCodeCamp Git Flow (https://www.youtube.com/watch?v=aJnFGMclhU8)
Pentesting Methodologies	PTES Standard (http://www.pentest-standard.org/)	The Cyber Mentor Pentesting (https://www.youtube.com/watch?v=3Kq1MIfTWCE)
Vulnerability Management	NIST Vulnerability Guide (https://csrc.nist.gov/publications/detail/sp/800-40/version-2/archive/2005-10-24)	Simplilearn Vuln Management (https://www.youtube.com/watch?v=Q337Nl8T9D8)
Cryptography Fundamentals	Cloudflare Cryptography (https://www.cloudflare.com/learning/ssl/what-is-cryptography/)	FreeCodeCamp Cryptography (https://www.youtube.com/watch?v=jhXCTbFnK8o)
OWASP Top 10	OWASP Framework (https://owasp.org/Top10/)	FreeCodeCamp OWASP (https://www.youtube.com/watch?v=Z_k8I6gX-r0)
OT Security	Dragos OT Security Guide (https://www.dragos.com/blog/implementing-zero-trust-in-operational-technology-ot-environments/)	NetworkChuck ICS & OT (https://www.youtube.com/watch?v=8QF_bRJUlHs)
Zero Trust Architecture	Microsoft Zero Trust Guidance (https://learn.microsoft.com/en-us/security/zero-trust/)	Go Cloud Architects Zero Trust (https://www.youtube.com/watch?v=ELSbzCDdUQI)
Network Protocols	IBM TCP/IP Suite (https://www.ibm.com/docs/en/aix/7.2?topic=network-tcpip-protocols)	FreeCodeCamp Protocols (https://www.youtube.com/watch?v=t9aAhuG0LkE)
HTTP/HTTPS Lifecycle	Roadmap.sh HTTP Guide (https://roadmap.sh/guides/journey-to-http-2)	Traversy Media HTTP (https://www.youtube.com/watch?v=iYM2zFP3Zn0)
DNS Management	Cloudflare DNS Overview (https://www.cloudflare.com/learning/dns/what-is-dns/)	NetworkChuck DNS (https://www.youtube.com/watch?v=mpQZVYPuDGU)
Load Balancing	NGINX Load Balancing (https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)	ByteByteGo Load Balancing (https://www.youtube.com/watch?v=K0Ta65OqQkY)
Containerization	Docker Containers (https://www.docker.com/resources/what-container/)	IBM Technology Containers (https://www.youtube.com/watch?v=cjXI-yxqGTI)
DB Normalization	Microsoft Normalization Basics (https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description)	FreeCodeCamp Normalization (https://www.youtube.com/watch?v=GFQaEYEc8_8)
ACID Properties	IBM ACID Overview (https://www.ibm.com/docs/en/cics-ts/5.4?topic=processing-acid-properties-transactions)	ByteByteGo ACID vs BASE (https://www.youtube.com/watch?v=7MTEkR8e8kE)
CAP Theorem	IBM CAP Theorem (https://www.ibm.com/topics/cap-theorem)	FreeCodeCamp CAP Theorem (https://www.youtube.com/watch?v=mJWbBItX51k)
Data Warehousing	AWS Data Warehouse Guide (https://aws.amazon.com/data-warehouse/)	FreeCodeCamp Data Warehouse (https://www.youtube.com/watch?v=HKcEyHF1U00)
Data Modeling	MongoDB Data Modeling (https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)	Simplilearn Data Modeling (https://www.youtube.com/watch?v=XJYO4TWO150)
Machine Learning Lifecycle	Google Cloud ML Lifecycle (https://cloud.google.com/architecture/ml-ops-continuous-delivery-and-automation-pipelines-in-machine-learning)	FreeCodeCamp Machine Learning (https://www.youtube.com/watch?v=i_LwzRmA_08)
Deep Learning	IBM Deep Learning Intro (https://www.ibm.com/topics/deep-learning)	FreeCodeCamp Deep Learning (https://www.youtube.com/watch?v=VyWAvY2CF9c)
NLP	IBM NLP Guide (https://www.ibm.com/topics/natural-language-processing)	Simplilearn NLP (https://www.youtube.com/watch?v=0Ooa3sXxc8U)
Prompt Engineering	IBM Prompt Engineering (https://www.ibm.com/think/prompt-engineering)	FreeCodeCamp Prompt Eng (https://www.youtube.com/watch?v=d0ghohL5Z2c)
Threat Modeling	OWASP Threat Modeling (https://owasp.org/www-community/Threat_Modeling)	Google Cloud Threat Modeling (https://www.youtube.com/watch?v=oB1sKnOa6ZQ)
Incident Response Planning	CISA IR Lifecycle (https://www.cisa.gov/resources-tools/programs/Incident-Response-Training)	Simplilearn Incident Mgt (https://www.youtube.com/watch?v=Z2MsbFB5VGw)
IAM	AWS IAM Concepts (https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)	FreeCodeCamp IAM (https://www.youtube.com/watch?v=5YFdUUvo7hM)
ITIL Framework	Atlassian ITIL Overview (https://www.atlassian.com/itsm/itil)	Simplilearn ITIL (https://www.youtube.com/watch?v=Z2MsbFB5VGw)
Cloud Service Models	IBM IaaS, PaaS, SaaS (https://www.ibm.com/topics/iaas-paas-saas)	FreeCodeCamp Cloud Models (https://www.youtube.com/watch?v=NKEFWyqJ5XA)
Problem Solving	MindTools Problem Solving (https://www.mindtools.com/pages/article/newTMC_00.htm)	TEDx Problem Solving (https://www.youtube.com/watch?v=SFdSUHslLhU)
Critical Thinking	SkillsYouNeed Critical Thinking (https://www.skillsyouneed.com/learn/critical-thinking.html)	TED-Ed Critical Thinking (https://www.youtube.com/watch?v=A9pygQghgH4)
Analytical Thinking	MindTools Analytical Thinking (https://www.mindtools.com/pages/article/analytical-thinking.htm)	Simplilearn Analytical Thinking (https://www.youtube.com/watch?v=XAasi_9Ngqk)
Leadership	CCL Leadership Skills (https://www.ccl.org/articles/leading-effectively-articles/soft-skill-development-the-human-skills-needed-for-success-at-every-leader-level/)	TED-Ed Leadership (https://www.youtube.com/watch?v=Lrma85k6fuc)
Team Collaboration	Open University Diverse Teams (https://www.open.edu/openlearn/money-business/working-diverse-teams/content-section-0)	Atlassian Collaboration (https://www.youtube.com/watch?v=4eW4Uroqe0w)
Effective Written Communication	SkillsYouNeed Writing (https://www.skillsyouneed.com/writing-skills.html)	FreeCodeCamp Business Writing (https://www.youtube.com/watch?v=KYLwiELcwbo)
Verbal Communication	Alison Interpersonal Skills (https://alison.com/course/diploma-in-interpersonal-skills)	Simerjeet Singh Communication (https://www.youtube.com/watch?v=Mgi4Onnn1sc)
Active Listening	MindTools Active Listening (https://www.mindtools.com/CommSkll/ActiveListening.htm)	TED-Ed Active Listening (https://www.youtube.com/watch?v=HBe-N5TNBHs)
Time Management	SkillsYouNeed Time Management (https://www.skillsyouneed.com/ps/time-management.html)	FreeCodeCamp Time Management (https://www.youtube.com/watch?v=8glqLdVFYBI)
Adaptability & Flexibility	CCL Adaptability (https://www.ccl.org/articles/leading-effectively-articles/adaptability-in-the-workplace/)	TEDx Power of Adaptability (https://www.youtube.com/watch?v=2NqatMn4twU)
Empathy	MindTools Emotional Intelligence (https://www.mindtools.com/axbwm3m/how-emotionally-intelligent-are-you)	Harvard Business Review Empathy (https://www.youtube.com/watch?v=K3qScH6v7uk)
Conflict Resolution	SkillsYouNeed Conflict Management (https://www.skillsyouneed.com/ips/conflict-resolution.html)	Bob Bordone Resolving Conflict (https://www.youtube.com/watch?v=HBe-N5TNBHs)
Mentoring & Coaching	SkillsYouNeed Mentoring (https://www.skillsyouneed.com/learn/mentoring.html)	TEDx Great Mentor (https://www.youtube.com/watch?v=Mgi4Onnn1sc)
Negotiation Skills	SkillsYouNeed Negotiation (https://www.skillsyouneed.com/ips/negotiation.html)	Bob Bordone Negotiation (https://www.youtube.com/watch?v=2NqatMn4twU)
Emotional Intelligence (EQ)	MindTools EQ at Work (https://www.mindtools.com/general/emotional-intelligence.html)	Audiobook Advisor EQ (https://www.youtube.com/watch?v=K3qScH6v7uk)
Creative Thinking	Articulate Innovation Skills (https://www.articulate.com/blog/the-best-soft-skills-training-strategies-to-boost-team-performance/)	TEDx Creative Problem Solving (https://www.youtube.com/watch?v=A9pygQghgH4)
Strategic Decision Making	MindTools Decision Models (https://www.mindtools.com/pages/article/newTED_00.htm)	Simplilearn Strategic Thinking (https://www.youtube.com/watch?v=XAasi_9Ngqk)
Presentation & Public Speaking	SkillsYouNeed Presentation (https://www.skillsyouneed.com/presentation-skills.html)	TED-Ed Public Speaking (https://www.youtube.com/watch?v=Lrma85k6fuc)
Client Relationship Management	HubSpot CRM Basics (https://www.hubspot.com/crm)	Harvard Business Review CRM (https://www.youtube.com/watch?v=4eW4Uroqe0w)
Stress Management & Resilience	CCL Resilience Training (https://www.ccl.org/articles/leading-effectively-articles/building-resilience/)	TEDx Stress Management (https://www.youtube.com/watch?v=SFdSUHslLhU)`;

const lines = rawText.split('\n').filter(l => l.trim() !== '' && !l.includes('Keterampilan\tArtikel'));
const finalJson = [];

for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 3) {
        const skillName = parts[0].trim();

        // Parse doc link
        const docMatch = parts[1].match(/(.+) \((https?:\/\/.+)\)/);
        const docTitle = docMatch ? docMatch[1].trim() : parts[1].trim();
        const docUrl = docMatch ? docMatch[2].trim() : "";

        // Parse video link
        const vidMatch = parts[2].match(/(.+) \((https?:\/\/.+)\)/);
        const vidTitle = vidMatch ? vidMatch[1].trim() : parts[2].trim();
        const vidUrl = vidMatch ? vidMatch[2].trim() : "";

        finalJson.push({
            skill_name: skillName,
            resources: [
                {
                    title: docTitle,
                    type: "article",
                    url: docUrl,
                    platform: "Official Documentation / Article"
                },
                {
                    title: vidTitle,
                    type: "video",
                    url: vidUrl,
                    platform: "YouTube / Video Platform"
                }
            ]
        });
    }
}

fs.writeFileSync('d:/Dokumen/skillgaptracker/dataset/resources.json', JSON.stringify(finalJson, null, 2));
console.log('Successfully structured ' + finalJson.length + ' resources into dataset/resources.json');

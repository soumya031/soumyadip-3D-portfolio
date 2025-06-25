// Interactive Terminal System
class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/cybersecurity';
        this.fileSystem = this.initializeFileSystem();
        this.processes = this.initializeProcesses();
        this.networkInterfaces = this.initializeNetwork();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.focusInput();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        this.input.addEventListener('input', () => {
            this.input.style.width = (this.input.value.length + 1) + 'ch';
        });
    }

    focusInput() {
        this.input.focus();
    }

    executeCommand() {
        const command = this.input.value.trim();
        if (!command) return;

        this.addToHistory(command);
        this.displayCommand(command);
        this.processCommand(command);
        this.input.value = '';
        this.input.style.width = '1ch';
        this.historyIndex = -1;
    }

    addToHistory(command) {
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.pop();
        }
    }

    navigateHistory(direction) {
        if (direction === 'up') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                this.input.value = '';
            }
        }
        this.input.style.width = (this.input.value.length + 1) + 'ch';
    }

    autoComplete() {
        const partial = this.input.value;
        const commands = Object.keys(this.commands);
        const matches = commands.filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.displayResponse('Ambiguous command. Possible matches: ' + matches.join(', '));
        }
    }

    displayCommand(command) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
            <span class="prompt">root@cybersecurity:${this.currentDirectory}$</span>
            <span class="command">${command}</span>
        `;
        this.output.appendChild(line);
    }

    displayResponse(response) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'terminal-response';
        responseDiv.innerHTML = response;
        this.output.appendChild(responseDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    processCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.displayResponse(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
    }

    // Command Definitions
    commands = {
        help: (args) => {
            const helpText = `
Available Commands:

📁 File & Directory Commands:
  ls, pwd, cd, mkdir, rm, cat, touch, chmod, chown

🔍 Search & Find Commands:
  find, grep, locate, which, whereis

📊 System Information:
  whoami, uname, top, ps, df, du, free

🌐 Network Commands:
  ifconfig, netstat, ping, traceroute, nslookup, dig

🔒 Cybersecurity Tools:
  nmap, netcat, tcpdump, wireshark, metasploit, john

⚙️ Process Management:
  kill, killall, nice, renice, bg, fg, jobs

📋 Text Processing:
  head, tail, sort, uniq, wc, sed, awk

🛠️ System Administration:
  sudo, su, passwd, useradd, usermod, groupadd

Type 'help [category]' for detailed help on specific categories.
            `;
            this.displayResponse(helpText);
        },

        ls: (args) => {
            const path = args[0] || this.currentDirectory;
            const files = this.getFilesInDirectory(path);
            let output = '';
            
            files.forEach(file => {
                const icon = file.type === 'directory' ? '📁' : '📄';
                const permissions = file.permissions || 'rw-r--r--';
                const size = file.size || '0';
                const date = file.date || 'Jan 1 00:00';
                output += `${permissions} ${size.padStart(8)} ${date} ${icon} ${file.name}\n`;
            });
            
            this.displayResponse(output || 'No files found.');
        },

        pwd: () => {
            this.displayResponse(this.currentDirectory);
        },

        cd: (args) => {
            const path = args[0];
            if (!path || path === '~') {
                this.currentDirectory = '/home/cybersecurity';
            } else if (path === '..') {
                this.currentDirectory = this.currentDirectory.split('/').slice(0, -1).join('/') || '/';
            } else if (path.startsWith('/')) {
                this.currentDirectory = path;
            } else {
                this.currentDirectory = this.currentDirectory + '/' + path;
            }
            this.displayResponse(`Changed directory to: ${this.currentDirectory}`);
        },

        whoami: () => {
            this.displayResponse('root');
        },

        uname: (args) => {
            const output = `Linux cybersecurity-terminal 5.15.0-generic #1 SMP Thu Dec 2 15:11:51 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux`;
            this.displayResponse(output);
        },

        top: () => {
            const output = `
top - 14:30:45 up 2:15,  1 user,  load average: 0.52, 0.58, 0.59
Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.3 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   8192.0 total,   2048.0 free,   3072.0 used,   3072.0 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   4096.0 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 root      20   0  1234567  123456  12345 S   2.3   1.5   0:15.23 terminal
 5678 root      20   0   987654   98765   9876 S   1.2   1.2   0:08.45 nmap
 9012 root      20   0   654321   65432   6543 S   0.8   0.8   0:05.67 netcat
            `;
            this.displayResponse(output);
        },

        ps: (args) => {
            const output = `
  PID TTY          TIME CMD
 1234 pts/0    00:00:15 terminal
 5678 pts/0    00:00:08 nmap
 9012 pts/0    00:00:05 netcat
13456 pts/0    00:00:02 bash
            `;
            this.displayResponse(output);
        },

        ifconfig: () => {
            const output = `
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::215:5dff:fe8a:1234  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:8a:12:34  txqueuelen 1000  (Ethernet)
        RX packets 12345  bytes 9876543 (9.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 9876  bytes 1234567 (1.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 1234  bytes 123456 (120.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1234  bytes 123456 (120.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
            `;
            this.displayResponse(output);
        },

        netstat: (args) => {
            const output = `
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 :::80                   :::*                    LISTEN
tcp6       0      0 :::443                  :::*                    LISTEN
            `;
            this.displayResponse(output);
        },

        ping: (args) => {
            const host = args[0] || 'google.com';
            const output = `
PING ${host} (142.250.190.78) 56(84) bytes of data.
64 bytes from ${host} (142.250.190.78): icmp_seq=1 time=15.2 ms
64 bytes from ${host} (142.250.190.78): icmp_seq=2 time=14.8 ms
64 bytes from ${host} (142.250.190.78): icmp_seq=3 time=15.1 ms
64 bytes from ${host} (142.250.190.78): icmp_seq=4 time=14.9 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3003ms
rtt min/avg/max/mdev = 14.800/15.000/15.200/0.200 ms
            `;
            this.displayResponse(output);
        },

        nmap: (args) => {
            if (args.includes('-h') || args.includes('--help')) {
                const helpText = `
Nmap 7.92 ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1/16
  -iL <inputfilename>: Input from list of hosts/networks
  -iR <num hosts>: Choose random targets
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
HOST DISCOVERY:
  -sL: List Scan - simply list targets to scan
  -sn: Ping Scan - disable port scan
  -Pn: Treat all hosts as online -- skip host discovery
  -PS/PA/PU/PY[portlist]: TCP SYN/ACK, UDP or SCTP discovery to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -PO[protocol list]: IP Protocol Ping
  -n/-R: Never do DNS resolution/Always resolve [default: sometimes]
  --dns-servers <serv1[,serv2],...>: Specify custom DNS servers
  --system-dns: Use OS's DNS resolver
  --traceroute: Trace hop path to each host
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  --scanflags <flags>: Customize TCP scan flags
  -sI <zombie host[:probeport]>: Idle scan
  -sY/sZ: SCTP INIT/COOKIE-ECHO scans
  -sO: IP protocol scan
  -b <FTP relay host>: FTP bounce scan
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080,S:9
  --exclude-ports <port ranges>: Exclude the specified ports from scanning
  -F: Fast mode - Scan fewer ports than the default scan
  -r: Scan ports consecutively - don't randomize
  --top-ports <number>: Scan <number> most common ports
  --port-ratio <ratio>: Scan ports more common than <ratio>
SERVICE/VERSION DETECTION:
  -sV: Probe open ports to determine service/version info
  --version-intensity <level>: Set from 0 (light) to 9 (try all probes)
  --version-light: Limit to most likely probes (intensity 2)
  --version-all: Try every single probe (intensity 9)
  --version-trace: Show detailed version scan activity (for debugging)
SCRIPT SCAN:
  -sC: equivalent to --script=default
  --script=<Lua scripts>: <Lua scripts> is a comma separated list of
           directories, script-files or script-categories
  --script-args=<n1=v1,[n2=v2,...]>: provide arguments to scripts
  --script-args-file=filename: provide NSE script args in a file
  --script-trace: Show all data sent and received
  --script-updatedb: Update the script database.
  --script-help=<Lua scripts>: Show help about scripts.
           <Lua scripts> is a comma-separated list of script-files or
           script-categories.
OS DETECTION:
  -O: Enable OS detection
  --osscan-limit: Limit OS detection to promising targets
  --osscan-guess: Guess OS more aggressively
TIMING AND PERFORMANCE:
  Options which take <time> are in seconds, or append 'ms' (milliseconds),
  's' (seconds), 'm' (minutes), or 'h' (hours) to the value (e.g. 30m).
  -T<0-5>: Set timing template (higher is faster)
  --min-hostgroup/max-hostgroup <size>: Parallel host scan group sizes
  --min-parallelism/max-parallelism <numprobes>: Probe parallelization
  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <time>: Specifies
      probe round trip time.
  --max-retries <tries>: Caps number of port scan probe retransmissions.
  --host-timeout <time>: Give up on target after this long
  --scan-delay/--max-scan-delay <time>: Adjust delay between probes
  --min-rate <number>: Send packets no slower than <number> per second
  --max-rate <number>: Send packets no faster than <number> per second
FIREWALL/IDS EVASION AND SPOOFING:
  -f; --mtu <val>: fragment packets (optionally w/given MTU)
  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys
  -S <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --proxies <url1,[url2],...>: Relay connections through HTTP/SOCKS4 proxies
  --data <hex string>: Append a custom payload to sent packets
  --data-string <string>: Append a custom ASCII string to sent packets
  --data-length <num>: Append random data to sent packets
  --ip-options <options>: Send packets with specified ip options
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address
  --badsum: Send packets with a bogus TCP/UDP/SCTP checksum
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt kIddi3,
     and Grepable format, respectively, to the given filename.
  -oA <basename>: Output in the three major formats at once
  -v: Increase verbosity level (use -vv or more for greater effect)
  -d: Increase debugging level (use -dd or more for greater effect)
  --reason: Display the reason a port is in a particular state
  --open: Only show open (or possibly open) ports
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
  --noninteractive: Disable runtime interactions via keyboard
  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML
  --webxml: Reference stylesheet from Nmap.Org for more portable XML
  --no-stylesheet: Prevent associating of XSL stylesheet w/XML output
MISC:
  -6: Enable IPv6 scanning
  -A: Enable OS detection, version detection, script scanning, and traceroute
  --datadir <dirname>: Specify custom Nmap data file location
  --send-eth/--send-ip: Send using raw ethernet frames or IP packets
  --privileged: Assume that the user is fully privileged
  --unprivileged: Assume the user lacks raw socket privileges
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  nmap -v -A scanme.nmap.org
  nmap -v -sn 192.168.0.0/16 10.0.0.0/8
  nmap -v -iR 10000 -Pn -p 80
SEE THE MAN PAGE (https://nmap.org/book/man.html) FOR MORE OPTIONS AND EXAMPLES
                `;
                this.displayResponse(helpText);
            } else {
                const target = args[0] || 'localhost';
                const output = `
Starting Nmap 7.92 ( https://nmap.org ) at 2023-12-15 14:30 UTC
Nmap scan report for ${target} (127.0.0.1)
Host is up (0.00012s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 1.23 seconds
                `;
                this.displayResponse(output);
            }
        },

        netcat: (args) => {
            if (args.includes('-h') || args.includes('--help')) {
                const helpText = `
[ncat 7.92] https://nmap.org/ncat
Usage: ncat [OPTIONS] [hostname] [port]

Options taking a time assume seconds. Append 'ms' for milliseconds,
's' for seconds, 'm' for minutes, or 'h' for hours (e.g. 500ms).

  -4                         Use IPv4 only
  -6                         Use IPv6 only
  -U, --unixsock             Use Unix domain sockets only
  -C, --crlf                 Use CRLF for EOL sequence
  -c, --sh-exec <command>    Executes the given command via /bin/sh
  -e, --exec <command>       Executes the given command
      --lua-exec <filename>  Executes the given Lua script
  -g hop1[,hop2,...]         Loose source routing hop points (8 max)
  -G <n>                     Loose source routing hop pointer (4, 8, 12, ...)
  -m, --max-conns <n>        Maximum <n> simultaneous connections
  -h, --help                 Display this help screen
  -d, --delay <time>         Wait between reads and writes
  -o, --output <filename>    Dump session data to a file
  -x, --hex-dump <filename>  Dump session data as hex to a file
  -i, --idle-timeout <time>  Idle read/write timeout
  -p, --source-port port     Specify source port to use
  -s, --source addr          Specify source address to use (doesn't affect -l)
  -l, --listen               Bind and listen for incoming connections
  -k, --keep-open            Accept multiple connections in listen mode
  -L, --listen-once          Accept a single connection in listen mode
  -n, --nodns                Do not resolve hostnames via DNS
  -t, --telnet               Answer Telnet negotiations
  -u, --udp                  Use UDP instead of default TCP
      --sctp                 Use SCTP instead of default TCP
  -v, --verbose              Set verbosity level (can be used several times)
  -w, --wait <time>          Connect timeout
  -z                         Zero-I/O mode, report connection status only
      --append-output        Append rather than clobber specified output files
      --send-only            Only send data, ignoring received; quit on EOF
      --recv-only            Only receive data, never send anything
      --allow                Allow only given hosts to connect to Ncat
      --allowfile            A file of hosts allowed to connect to Ncat
      --deny                 Deny given hosts from connecting to Ncat
      --denyfile             A file of hosts denied from connecting to Ncat
      --broker               Enable Ncat's connection brokering mode
      --chat                 Start a simple Ncat chat server
      --proxy <addr[:port]>  Specify address of host to proxy through
      --proxy-type <type>    Specify proxy type ("http" or "socks4" or "socks5")
      --proxy-auth <user:pass> Authenticate with HTTP or SOCKS proxy server
      --ssl                  Connect or listen with SSL
      --ssl-cert             Specify SSL certificate file (PEM) for listening
      --ssl-key              Specify SSL private key (PEM) for listening
      --ssl-verify           Verify trust and domain name of certificates
      --ssl-trustfile        PEM file containing trusted SSL certificates
      --version              Display Ncat's version information and exit

See the ncat(1) manpage for full documentation, examples and tips.
                `;
                this.displayResponse(helpText);
            } else {
                const output = `
Ncat: Version 7.92 ( https://nmap.org/ncat )
Ncat: Connected to 127.0.0.1:80.
HTTP/1.1 200 OK
Date: Thu, 15 Dec 2023 14:30:45 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working.</p>
</body>
</html>
                `;
                this.displayResponse(output);
            }
        },

        clear: () => {
            this.output.innerHTML = '';
        },

        exit: () => {
            this.displayResponse('Goodbye! Terminal session ended.');
            this.input.disabled = true;
        },

        cat: (args) => {
            const filename = args[0];
            if (!filename) {
                this.displayResponse('cat: missing file operand');
                return;
            }
            
            const content = this.getFileContent(filename);
            if (content) {
                this.displayResponse(content);
            } else {
                this.displayResponse(`cat: ${filename}: No such file or directory`);
            }
        },

        grep: (args) => {
            if (args.length < 1) {
                this.displayResponse('grep: missing pattern');
                return;
            }
            
            const pattern = args[0];
            const filename = args[1] || 'sample.txt';
            const content = this.getFileContent(filename);
            
            if (content) {
                const lines = content.split('\n');
                const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
                if (matches.length > 0) {
                    this.displayResponse(matches.join('\n'));
                } else {
                    this.displayResponse('No matches found.');
                }
            } else {
                this.displayResponse(`grep: ${filename}: No such file or directory`);
            }
        },

        find: (args) => {
            const output = `
/home/cybersecurity
/home/cybersecurity/documents
/home/cybersecurity/documents/readme.txt
/home/cybersecurity/documents/config.conf
/home/cybersecurity/scripts
/home/cybersecurity/scripts/scan.sh
/home/cybersecurity/scripts/backup.sh
/home/cybersecurity/logs
/home/cybersecurity/logs/access.log
/home/cybersecurity/logs/error.log
            `;
            this.displayResponse(output);
        },

        df: () => {
            const output = `
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1      104857600  52428800  52428800  50% /
tmpfs           8388608       0   8388608   0% /dev/shm
/dev/sdb1      209715200 104857600 104857600  50% /home
            `;
            this.displayResponse(output);
        },

        free: () => {
            const output = `
              total        used        free      shared  buff/cache   available
Mem:        8388608     4194304     2097152      524288     2097152     4194304
Swap:       2097152           0     2097152
            `;
            this.displayResponse(output);
        },

        date: () => {
            const now = new Date();
            const output = now.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });
            this.displayResponse(output);
        },

        uptime: () => {
            const output = `
 14:30:45 up 2 days, 15:30,  1 user,  load average: 0.52, 0.58, 0.59
            `;
            this.displayResponse(output);
        }
    };

    // File System Simulation
    initializeFileSystem() {
        return {
            '/home/cybersecurity': {
                type: 'directory',
                contents: {
                    'documents': { type: 'directory' },
                    'scripts': { type: 'directory' },
                    'logs': { type: 'directory' },
                    'readme.txt': { 
                        type: 'file',
                        content: 'Welcome to the Cybersecurity Terminal!\nThis is a simulated environment for learning.\n\nAvailable directories:\n- documents/\n- scripts/\n- logs/\n\nUse ls, cd, cat, and other commands to explore.'
                    }
                }
            },
            '/home/cybersecurity/documents': {
                type: 'directory',
                contents: {
                    'config.conf': {
                        type: 'file',
                        content: '# Network Configuration\n\ninterface eth0 {\n    ip_address = 192.168.1.100\n    netmask = 255.255.255.0\n    gateway = 192.168.1.1\n}\n\n# Security Settings\nfirewall_enabled = true\nssh_port = 22\nhttps_port = 443'
                    },
                    'readme.txt': {
                        type: 'file',
                        content: 'Documentation files are stored here.\n\nconfig.conf - Network configuration\nreadme.txt - This file'
                    }
                }
            },
            '/home/cybersecurity/scripts': {
                type: 'directory',
                contents: {
                    'scan.sh': {
                        type: 'file',
                        content: '#!/bin/bash\n\n# Network Scanner Script\necho "Starting network scan..."\nnmap -sn 192.168.1.0/24\necho "Scan complete!"'
                    },
                    'backup.sh': {
                        type: 'file',
                        content: '#!/bin/bash\n\n# Backup Script\necho "Creating backup..."\ntar -czf backup_$(date +%Y%m%d).tar.gz /home/cybersecurity\necho "Backup complete!"'
                    }
                }
            },
            '/home/cybersecurity/logs': {
                type: 'directory',
                contents: {
                    'access.log': {
                        type: 'file',
                        content: '192.168.1.100 - - [15/Dec/2023:14:30:45 +0000] "GET / HTTP/1.1" 200 1234\n192.168.1.101 - - [15/Dec/2023:14:31:12 +0000] "POST /login HTTP/1.1" 401 567\n192.168.1.102 - - [15/Dec/2023:14:32:01 +0000] "GET /api/data HTTP/1.1" 200 890'
                    },
                    'error.log': {
                        type: 'file',
                        content: '[15/Dec/2023:14:30:45] ERROR: Connection timeout\n[15/Dec/2023:14:31:12] ERROR: Authentication failed\n[15/Dec/2023:14:32:01] WARNING: High memory usage detected'
                    }
                }
            }
        };
    }

    getFilesInDirectory(path) {
        const dir = this.fileSystem[path];
        if (!dir || dir.type !== 'directory') {
            return [];
        }
        
        const files = [];
        for (const [name, info] of Object.entries(dir.contents)) {
            files.push({
                name,
                type: info.type,
                permissions: info.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--',
                size: info.type === 'file' ? (info.content?.length || 0) : 4096,
                date: 'Dec 15 14:30'
            });
        }
        
        return files.sort((a, b) => {
            if (a.type === 'directory' && b.type !== 'directory') return -1;
            if (a.type !== 'directory' && b.type === 'directory') return 1;
            return a.name.localeCompare(b.name);
        });
    }

    getFileContent(filename) {
        const fullPath = filename.startsWith('/') ? filename : this.currentDirectory + '/' + filename;
        const file = this.fileSystem[fullPath];
        return file?.type === 'file' ? file.content : null;
    }

    // Process Simulation
    initializeProcesses() {
        return [
            { pid: 1234, name: 'terminal', user: 'root', cpu: 2.3, mem: 1.5 },
            { pid: 5678, name: 'nmap', user: 'root', cpu: 1.2, mem: 1.2 },
            { pid: 9012, name: 'netcat', user: 'root', cpu: 0.8, mem: 0.8 }
        ];
    }

    // Network Simulation
    initializeNetwork() {
        return {
            eth0: {
                ip: '192.168.1.100',
                mac: '00:15:5d:8a:12:34',
                status: 'UP'
            },
            lo: {
                ip: '127.0.0.1',
                mac: '00:00:00:00:00:00',
                status: 'UP'
            }
        };
    }
}

// Global functions for HTML integration
window.executeQuickCommand = function(command) {
    if (window.terminal) {
        window.terminal.input.value = command;
        window.terminal.executeCommand();
    }
};

window.showCategory = function(category) {
    // This would show command categories in a modal or sidebar
    console.log('Showing category:', category);
};

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('terminal-output')) {
        window.terminal = new Terminal();
    }
}); 
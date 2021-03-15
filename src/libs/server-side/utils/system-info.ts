import os, { CpuInfo, NetworkInterfaceInfo } from 'os';

type SystemInfo = {
    hostName: string;
    arch: string;
    platform: NodeJS.Platform;
    systemType: string;
    systemVersion: string;
    loadAvg: number[];
    liveTime: number;
    cpus: CpuInfo[];
    totalMem: number;
    freeMem: number;
    networks: NodeJS.Dict<NetworkInterfaceInfo[]>;
};

function getSystemInfo(): SystemInfo {
    return {
        hostName: os.hostname(),
        arch: os.arch(),
        platform: os.platform(),
        systemType: os.release(),
        systemVersion: os.version(),
        loadAvg: os.loadavg(),
        liveTime: os.uptime(),
        cpus: os.cpus(),
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        networks: os.networkInterfaces(),
    };
}

export { getSystemInfo };

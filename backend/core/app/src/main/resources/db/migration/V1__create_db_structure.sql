create table sessions (
  	id uuid not null,
  	created_at timestamp not null default now(),
  	updated_at timestamp not null default now(),
  	deleted boolean not null default false,
  	state VARCHAR default 'closed',
	interface_name text not null,
	interface_description text not null,
	is_sniffer_on boolean not null default false,
	primary key (id)
);

create table packets (
    id uuid not null,
    created_at timestamp not null default now(),
    intercepted_at timestamp not null default now(),
    mac_src text not null,
    mac_dst text not null,
    ip_src text not null,
    ip_dst text not null,
    protocol text not null,
    port_src text not null,
    port_dst text not null,
    payload text,
    session_id uuid not null,
    primary key (id)
);

create table threats (
	id uuid not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now(),
	deleted boolean not null default false,
	title text not null,
	macs_src text,
	macs_dst text,
	ips_src text,
	ips_dst text,
	protocol text,
	ports_src text,
	ports_dst text,
	payload text,
	primary key (id)
);

create table session2threat (
	session_id uuid not null,
	threat_id uuid not null,
	primary key (session_id, threat_id)
);

create table threat2packet (
	threat_id uuid not null,
	packet_id uuid not null,
	primary key (threat_id, packet_id)
);

alter table if exists packets
	add constraint packets2sessions foreign key (session_id) references sessions;

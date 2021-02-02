
var bd_map_cfg={
	host_dir:"http://200.200.200.32/map_resource/",
	ak:"ZgbjDUBzYetlX3DFwOq28rCEtdU7KrMx",  //百度密钥
	wp_proxy_pass:"http://200.200.200.32/gse_baidu0/", //瓦片代理
	api_host_proxy_pass:"http://200.200.200.32/cen/" //中心点代理
};


//开发环境
/*bd_map_cfg={	
	host_dir:"http://127.0.0.1:8020/lazy/otherui/map/map_resource/",
	ak:"ZgbjDUBzYetlX3DFwOq28rCEtdU7KrMx",  //百度密钥
	wp_proxy_pass:"http://127.0.0.1/gse_baidu0/", //瓦片代理	
	api_host_proxy_pass:"http://127.0.0.1/cen/" //中心点代理
};
*/

document.write('<script type="text/javascript" src="'+bd_map_cfg.host_dir+'gse_map.js"></script>');
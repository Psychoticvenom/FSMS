var hunterFSM = function (mesh, text){
  
  var timer;
  
  var fsm = StateMachine.create({

    events: [
		{ name: 'start',     from: 'none',      to: 'stand'  },
		{ name: 'found',     from: 'stand',     to: 'seek'   },
		{ name: 'found',     from: 'search',    to: 'seek'   },
		{ name: 'found',     from: 'patrol',    to: 'seek'   },
		{ name: 'hear',      from: 'stand',     to: 'search' },
		{ name: 'hear',      from: 'patrol',    to: 'search' },
		{ name: 'standed',   from: 'stand',     to: 'patrol' },
		{ name: 'patroled',  from: 'patrol',    to: 'stand'  },
		{ name: 'lost',      from: 'seek',      to: 'search' },
		{ name: 'nfound',    from: 'search',    to: 'stand'  },
		{ name: 'catched',   from: 'seek',      to: 'catch'  }
	],

    callbacks: {
		onbeforestart:      function(event, from, to) { },
		onstart:            function(event, from, to) { },

		onbeforefound:      function(event, from, to) { },
		onbeforehear:       function(event, from, to) { },
		onbeforestanded:    function(event, from, to) { },
		onbeforepatroled:   function(event, from, to) { },
		onbeforelost:       function(event, from, to) { },
		onbeforenfound:     function(event, from, to) { },
		onbeforecatched:    function(event, from, to) { },

		onfound:            function(event, from, to) { 
			//���u�����쪱�a
		},
		onhear:             function(event, from, to) {
			//ť�O�d��Ĳ�쪱�a
		},
		onstanded:          function(event, from, to) {
			//�g�L�@�q�ɶ���A�}�l����
		},
		onpatroled:         function(event, from, to) {
			//���ޤ@�q�ɶ���A�^�쯸�ߪ��A
		},
		onlost:             function(event, from, to) {
			//�����l�᪱�a
		},
		onnfound:           function(event, from, to) {
			//���a�����b���u��
		},
		oncatched:          function(event, from, to) {
			//�S��ť�쪱�a�����R
		},

		onleavestand:       function(event, from, to) { },
		onleavesearch:      function(event, from, to) { },
		onleaveseek:        function(event, from, to) { },
		onleavepatrol:      function(event, from, to) { },

		onstand:            function(event, from, to) {
		
			//���w�I�]��C�t�^�[��
			//�C����ഫ��patrol���A
			text.text = "Hunter : Stand";
			mesh.material = new THREE.MeshLambertMaterial({color: 0xffffff});
		
			clearTimeout(timer);
			timer = setTimeout (function() {
				fsm.standed();
			},2000);
		},
		onsearch:           function(event, from, to) {
		
			//��a����M�䪱�a
			text.text = "Hunter : Search";
			mesh.material = new THREE.MeshLambertMaterial({color: 0xffff00}); 
		
			clearTimeout(timer);
		},
		onseek:             function(event, from, to) {
		
			//�l�v���a
			text.text = "Hunter : Seek" ;
			mesh.material = new THREE.MeshLambertMaterial({color: 0xff0000});
		
			clearTimeout(timer);
		},
		onpatrol:           function(event, from, to) {
		
			//�H�������@��target���y�H������V�樫
			//�C����^��stand���A
			text.text = "Hunter : Patrol" ;
			mesh.material = new THREE.MeshLambertMaterial({color: 0x000000});
		
			clearTimeout(timer);
			timer = setTimeout (function() {
				fsm.patroled();
			},5000);
		},
		oncatch:            function(event, from, to) { 
		
			//�C������
			text.text = "Hunter : Catch";
		
			clearTimeout(timer);
		}
    }
  });

  fsm.start();
  return fsm;
}

import React from 'react'

const ProgressBar = (props) => {
  const { bgcolor, completed, completed_money, need_money } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginBottom: 10,
		
		
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }
	const fillerStyles100 = {
    height: '100%',
    width: '100%',
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
		
		
  }
	const labelStyles2 = {
    padding: 10,
    color: 'black',
    fontWeight: 'bold'
		
  }

  return (
		<div>
			<div style={{display:'flex', justifyContent: 'space-between'}}>
			<span style={labelStyles2}>{`${completed_money} ₽`}</span>
			<span style={labelStyles2}>{`${need_money} ₽`}</span>
			</div>
			
    <div style={containerStyles}>
			{completed_money/need_money<1 && 
				<div style={fillerStyles}>
				{completed_money/need_money>0.1 && 
				<span style={labelStyles}  >{`${completed}%`}</span>
				} 
      </div>
			}
			{completed_money/need_money>=1 && 
				<div style={fillerStyles100}>
				{completed_money/need_money>0.1 && 
				<span style={labelStyles}  >{`${completed}%`}</span>
				} 
      </div>
			}
    </div>
		
		</div>
  );
};

export default ProgressBar;
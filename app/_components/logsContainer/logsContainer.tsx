import React from 'react';
import UserChip from '@components/userChip/userChip.component';
import { HiXMark } from 'react-icons/hi2';
import './logsContainer.styles.scss';

interface LogData {
  title: string;
  date: string;
}

interface LogsContainerProps {
  dataContent: LogData[];
}

const LogsContainer: React.FC<LogsContainerProps> = ({ dataContent }) => {
	return (
		<div className="containerLogs">
			<div className="contentLogsContainer">
				<div className="lineDecoration"></div>
				<div className="headerLogsContainer">
					<HiXMark color="white" size={38} className="closeIcon" />
				</div>

				<div className="allLogs">
					{dataContent.map((content, index) => (
						<div key={index}>
							<UserChip
								userInfo={{
									name: 'Gwen Stacy',
									role: 'Monteur',
									email: 'gwen@gmail.com',
									avatar:
                    'https://images.unsplash.com/photo-1533618561606-3b2a0766d159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
								}}
							/>
							<div className="stepLog" key={index}>
								<div className="pointLog"></div>
								<div className="contentLog">
									<h3>{content.title}</h3>
									<p>{content.date}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LogsContainer;

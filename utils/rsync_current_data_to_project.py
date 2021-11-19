import os

cmd = 'rsync -a bnb2@cool001.eas.cornell.edu:/pool/data2/bnb2/ny_runoff_risk/web_data/fcst_map_images /Users/bnb2/projects/ny-applicator-forecast/public/.'
res = os.system(cmd)

cmd = 'rsync -a bnb2@cool001.eas.cornell.edu:/pool/data2/bnb2/ny_runoff_risk/web_data/data /Users/bnb2/projects/ny-applicator-forecast/public/.'
res = os.system(cmd)

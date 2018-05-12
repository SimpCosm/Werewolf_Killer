import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.net.ssl.SSLException;

import org.bytedeco.javacpp.opencv_core;
import org.bytedeco.javacpp.opencv_imgcodecs;
import org.bytedeco.javacv.OpenCVFrameConverter;
import org.bytedeco.javacv.OpenCVFrameGrabber;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
 
/**
 * 用socket来收发http协议报文
 */
public class SocketHttp {
    public static void main(String[] args) {
        Thread threadReceive=new Thread(new TestReceiveHttp());
        threadReceive.start();
    }
}
 
class TestReceiveHttp implements Runnable{
    @Override
    public void run() {
        ServerSocket server;
        Socket socket;
        try{
            server=new ServerSocket(8079);
            System.out.println("正在等待8079端口的请求!!!!");
            while(true){
                socket=server.accept();
                if(socket!=null){
                    new Thread(new TestReveiveThread(socket)).start();
                    System.out.println("new connection.");
                }
            }
        }catch (Exception e) {
            System.out.println("异常");
        }
    }
}
 
class TestReveiveThread implements Runnable{
    Socket socket;
    public TestReveiveThread(Socket s) {
        socket=s;
    }
    public void run() {
        try{
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream(), "utf-8"));
            OutputStreamWriter osw = new OutputStreamWriter(socket.getOutputStream(),"utf-8");
            String line=null;
            while(true){
            	line=bufferedReader.readLine();
            	System.out.println(line);
                if(!line.equals("Content-Disposition: form-data; name=\"ges_list\"")){
                    continue;
                }
                // json array str here
                line=bufferedReader.readLine();
                line=bufferedReader.readLine();
                List<String> ges_opt = parseJSONWithJSONArray(line);
                System.out.println("======> parse array from request:");
                System.out.println(ges_opt);
                while(true) {
	                // while (!samplePicture());
	                String faceStr = FaceTest.requestFace();
	                String responseStr = parseJSONWithJSONObject(faceStr);
	                if (ges_opt.contains(responseStr)) {
	                	// send response
	                	FaceTest.response(responseStr);
	                	break;
	                }
	                // 没有得到想要的手势，继续采集、判别
                }
            }
        }catch (Exception e) {
            System.out.println("客户端接受异常"+e.getMessage());
        }
    }
    
    List<String> allges = Arrays.asList("thumb_up","big_v","thumb_down",
			"heart_c","beg","heart_d","double_finger_up","heart_a","heart_b",
			"victory","fist","palm_up","unknown","thanks","rock","hand_open",
			"namaste","ok","index_finger_up","phonecall");
	// pasre response from face++
    private String parseJSONWithJSONObject(String jsonData) {
    	String response = null;
    	try
        {
            JSONObject jsonObject = new JSONObject(jsonData);
            JSONArray array = (JSONArray) jsonObject.get("hands");
            JSONObject gestureObj = (JSONObject) array.get(0);
            JSONObject gesRes = (JSONObject) gestureObj.get("gesture");
            System.out.println(gesRes);
            for (String ges : allges) {
            	if((int)gesRes.get(ges) > 90) {
            		response = ges;
            		break;
            	}
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    	return response;
    }
    // sample a picture from local
	static OpenCVFrameConverter.ToIplImage converter = new OpenCVFrameConverter.ToIplImage();
    static String PICTURE_PATH = "./src/test/now.jpg";
    public static boolean samplePicture() throws Exception, InterruptedException
    {
        OpenCVFrameGrabber grabber = new OpenCVFrameGrabber(0);
        grabber.start();   //开始获取摄像头数据
        opencv_core.Mat mat = converter.convertToMat(grabber.grabFrame());
        
        if ( !opencv_imgcodecs.imwrite(PICTURE_PATH, mat)) {
        	System.out.println("Write failed");
        	return false;
        }
        System.out.println("Write success");
        return true;
    }
    
    private List<String> parseJSONWithJSONArray(String jsonData) {
    	List<String> gesture = new ArrayList();
    	try
        {
            JSONArray jsonArray = new JSONArray(jsonData);
            for (int i=0; i < jsonArray.length(); i++)    {
            	gesture.add(jsonArray.get(i).toString());
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    	System.out.println("parse request: " + gesture);
        return gesture;
    }
}

class FaceTest {
	public static void response(String ans) throws Exception{
		
		String url = "https://127.0.0.1";
        HashMap<String, String> map = new HashMap<>();
        HashMap<String, byte[]> byteMap = new HashMap<>();
        map.put("ans", ans);
        try{
        	post(url, map, byteMap);
        }catch (Exception e) {
        	e.printStackTrace();
		}
	}
	
	public static String requestFace() throws Exception{
		String ansString = null;
        File file = new File("./src/test/now.jpg");
		byte[] buff = getBytesFromFile(file);
		String url = "https://api-cn.faceplusplus.com/humanbodypp/beta/gesture";
        HashMap<String, String> map = new HashMap<>();
        HashMap<String, byte[]> byteMap = null;
        map.put("api_key", "1m972QdR8NCFkUrffNjfxYQTC6Z6PqqF");
        map.put("api_secret", "oW-34l5yHP-XIRbb-EVKpFSWIQFpDyMS");
//		map.put("return_landmark", "1");
//      map.put("return_attributes", "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus");
        byteMap.put("image_file", buff);
        try{
            byte[] bacd = post(url, map, byteMap);
            String str = new String(bacd);
            System.out.println(str);
            ansString = str;
            
        }catch (Exception e) {
        	e.printStackTrace();
		}
        return ansString;
	}
	
	private final static int CONNECT_TIME_OUT = 30000;
    private final static int READ_OUT_TIME = 50000;
    private static String boundaryString = getBoundary();
    protected static byte[] post(String url, HashMap<String, String> map, HashMap<String, byte[]> fileMap) throws Exception {
        HttpURLConnection conne;
        URL url1 = new URL(url);
        conne = (HttpURLConnection) url1.openConnection();
        conne.setDoOutput(true);
        conne.setUseCaches(false);
        conne.setRequestMethod("POST");
        conne.setConnectTimeout(CONNECT_TIME_OUT);
        conne.setReadTimeout(READ_OUT_TIME);
        conne.setRequestProperty("accept", "*/*");
        conne.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundaryString);
        conne.setRequestProperty("connection", "Keep-Alive");
        conne.setRequestProperty("user-agent", "Mozilla/4.0 (compatible;MSIE 6.0;Windows NT 5.1;SV1)");
        DataOutputStream obos = new DataOutputStream(conne.getOutputStream());
        Iterator iter = map.entrySet().iterator();
        while(iter.hasNext()){
            Map.Entry<String, String> entry = (Map.Entry) iter.next();
            String key = entry.getKey();
            String value = entry.getValue();
            obos.writeBytes("--" + boundaryString + "\r\n");
            obos.writeBytes("Content-Disposition: form-data; name=\"" + key
                    + "\"\r\n");
            obos.writeBytes("\r\n");
            obos.writeBytes(value + "\r\n");
        }
        if(fileMap != null && fileMap.size() > 0){
            Iterator fileIter = fileMap.entrySet().iterator();
            while(fileIter.hasNext()){
                Map.Entry<String, byte[]> fileEntry = (Map.Entry<String, byte[]>) fileIter.next();
                obos.writeBytes("--" + boundaryString + "\r\n");
                obos.writeBytes("Content-Disposition: form-data; name=\"" + fileEntry.getKey()
                        + "\"; filename=\"" + encode(" ") + "\"\r\n");
                obos.writeBytes("\r\n");
                obos.write(fileEntry.getValue());
                obos.writeBytes("\r\n");
            }
        }
        obos.writeBytes("--" + boundaryString + "--" + "\r\n");
        obos.writeBytes("\r\n");
        obos.flush();
        obos.close();
        InputStream ins = null;
        int code = conne.getResponseCode();
        try{
            if(code == 200){
                ins = conne.getInputStream();
            }else{
                ins = conne.getErrorStream();
            }
        }catch (SSLException e){
            e.printStackTrace();
            return new byte[0];
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buff = new byte[4096];
        int len;
        while((len = ins.read(buff)) != -1){
            baos.write(buff, 0, len);
        }
        byte[] bytes = baos.toByteArray();
        ins.close();
        return bytes;
    }
    private static String getBoundary() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for(int i = 0; i < 32; ++i) {
            sb.append("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".charAt(random.nextInt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_".length())));
        }
        return sb.toString();
    }
    private static String encode(String value) throws Exception{
        return URLEncoder.encode(value, "UTF-8");
    }
    
    public static byte[] getBytesFromFile(File f) {
        if (f == null) {
            return null;
        }
        try {
            FileInputStream stream = new FileInputStream(f);
            ByteArrayOutputStream out = new ByteArrayOutputStream(1000);
            byte[] b = new byte[1000];
            int n;
            while ((n = stream.read(b)) != -1)
                out.write(b, 0, n);
            stream.close();
            out.close();
            return out.toByteArray();
        } catch (IOException e) {
        }
        return null;
    }
}